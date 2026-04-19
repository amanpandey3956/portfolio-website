---
title: "How to deploy an Open Source LLM reliably"
slug: "how-to-deploy-an-open-source-llm-reliably"
banner: "/projects/llm-banner.webp"
author: "Aman Pandey"
authorImage: "/projects/myimg.webp" 
date: "April 19, 2026"
summary: "A complete hands-on guide to deploying open source llm on a Kubernetes cluster using Ollama, setting up Grafana and Prometheus for monitoring, and building a Streamlit chatbot UI — all on your local machine."
tags: ["Kubernetes", "LLM"]
---

<img src="/projects/llm-banner.webp" alt="Terraform Banner" style="margin-bottom: 28px;" />

## Introduction

Large Language Models (LLMs) have taken the world by storm, but most tutorials only show you how to call a paid API like OpenAI or Gemini. What if you want to run your own model — one that's fully under your control, costs nothing per token, and runs on your own infrastructure?

That's exactly what this guide covers. We will deploy Mistral 7B, an open source LLM, inside a Kubernetes cluster running locally on your machine using Minikube. We will set up Grafana and Prometheus to monitor the cluster's health in real time, and build a Streamlit chatbot UI that talks to the model. Everything runs on your laptop — no cloud account needed.

By the end of this guide you will have:

- A running LLM served inside a Kubernetes pod via Ollama
- Real-time cluster monitoring with Grafana dashboards
- A working chatbot UI that you can demo and record

**Why does running LLMs reliably matter?** When you deploy a model in production, you need to think beyond just "does it work on my machine." You need resource management, persistent storage, health monitoring, and a clean way to serve the model. Kubernetes gives you all of that, even for a local setup.

---

### Prerequisites

Before we begin, make sure you have the following installed on your system:

- **Minikube** — to run a local Kubernetes cluster
- **kubectl** — to interact with the cluster
- **Helm** — to install monitoring tools via charts
- **Docker** — used as the Minikube driver
- **Python 3** — to run the chatbot UI

You can verify all of these are ready by running:

```bash
minikube version
kubectl version --client
helm version
docker --version
python3 --version
```

## Choosing the Right Model with llmfit

One of the biggest mistakes people make when deploying open source LLMs is picking a model that's too large for their hardware. This causes crashes, extremely slow responses, or out-of-memory errors inside the cluster. Before deploying anything, we need to understand what our hardware can actually handle.

This is where `llmfit` comes in. It is a terminal tool that reads your system's RAM, CPU cores, and GPU VRAM, and tells you exactly which models will run well on your machine — including the best quantization level, estimated tokens per second, and memory usage.

Install it with:

```bash
curl -fsSL https://llmfit.axjns.dev/install.sh | sh
```

Once installed, run it to get hardware-aware model recommendations:

```bash
# Interactive TUI showing all models scored for your hardware
llmfit

# Or get JSON output with top recommendations
llmfit recommend --json --limit 5
```

## Installing Ollama and Pulling Mistral 7B

Ollama is a tool that makes it easy to run open source LLMs locally. It handles model downloading, quantization, and serving — exposing a clean REST API on port `11434` that your applications can talk to. Think of it as Docker, but for LLMs.

Install Ollama on Fedora Linux:

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

The installer sets up Ollama as a systemd service and automatically detects your GPU. In our case it detected the AMD GPU and enabled ROCm support:

```bash
amanpandey@aman-fedora:~$ curl -fsSL https://ollama.com/install.sh | sh
>>> Cleaning up old version at /usr/local/lib/ollama
[sudo] password for amanpandey: 
>>> Installing ollama to /usr/local
>>> Downloading ollama-linux-amd64.tar.zst
######################################################################## 100.0%
>>> Adding ollama user to render group...
[sudo] password for amanpandey: 
>>> Adding ollama user to video group...
>>> Adding current user to ollama group...
>>> Creating ollama systemd service...
>>> Enabling and starting ollama service...
>>> Downloading ollama-linux-amd64-rocm.tar.zst
######################################################################## 100.0%
>>> The Ollama API is now available at 127.0.0.1:11434.
>>> Install complete. Run "ollama" from the command line.
>>> AMD GPU ready.
```

Verify the installation:

```bash
ollama --version
```
Output:
```bash
amanpandey@aman-fedora:~$ ollama --version
ollama version is 0.21.0
```

Now pull the Mistral 7B model. This downloads approximately 4.1GB, So it'll take a few minutes depending on your internet.

```bash
ollama pull mistral
```

```bash
amanpandey@aman-fedora:~$ ollama pull mistral
pulling manifest 
pulling f5074b1221da: 100%  4.4 GB                         
pulling 43070e2d4e53: 100%   11 KB                         
pulling 1ff5b64b61b9: 100%   799 B                         
pulling ed11eda7790d: 100%    30 B                         
pulling 1064e17101bd: 100%   487 B                         
verifying sha256 digest 
writing manifest 
success
```
Once the download is complete, test the model directly from the command line:

```bash
ollama run mistral "Which model are you?"
```
Then test the second question:

```bash
ollama run mistral "What is terraform module?"
```
Below is the output of both the questions:
```bash
amanpandey@aman-fedora:~$ ollama run mistral "Which model are you?"
 I am a model of the GPT series developed by Mistral AI. While I share some similarities with models like megaModel, I was trained on a 
different dataset and have unique characteristics.

amanpandey@aman-fedora:~$ ollama run mistral "What is terraform module?"
 A Terraform module is a collection of Terraform configuration files that can be reused and shared across multiple projects. Modules allow 
you to encapsulate, manage, and version specific pieces of your infrastructure as code.

A module defines the resources and settings needed for a particular component of an infrastructure stack, such as a virtual network, a 
database, or a set of security rules. By creating reusable modules, you can avoid duplicating code, reduce errors, and improve consistency 
across multiple deployments.

Using modules in Terraform also makes it easier to collaborate with other developers by promoting the concept of infrastructure as code 
(IaC). Teams can create, share, and maintain standardized components, allowing them to focus on building new functionality rather than 
repeating common configurations.

To use a module in your Terraform configuration, you add its source (either from a public registry like Terraform Registry or a private 
repository) and reference it within your main Terraform file using the `module` block.
```

Finally verify the API is working (this is what your chatbot UI will use later):
```bash
curl http://localhost:11434/api/generate \
  -d '{
    "model": "mistral",
    "prompt": "Which model are you?",
    "stream": false
  }'
```

**output:**

```bash
amanpandey@aman-fedora:~$ curl http://localhost:11434/api/generate \
  -d '{
    "model": "mistral",
    "prompt": "Which model are you?",
    "stream": false
  }'
{"model":"mistral","created_at":"2026-04-18T14:06:35.305572486Z","response":" I am a text-based AI model designed to provide responses based on the input provided by the user. I don't have the ability to self-awareness or personality like human beings do.","done":true,"done_reason":"stop","context":[3,29473,10363,2997,1228,1136,29572,4,29473,1083,1605,1032,3013,29501,6295,16875,2997,6450,1066,3852,15683,3586,1124,1040,3555,4625,1254,1040,2956,29491,1083,1717,29510,29475,1274,1040,6305,1066,1776,29501,16718,2235,1210,14123,1505,3698,17673,1279,29491],"total_duration":6920653420,"load_duration":49170254,"prompt_eval_count":9,"prompt_eval_duration":488103819,"eval_count":41,"eval_duration":6355037322}
```

If you get a JSON response with a `"response"` field containing text, Ollama is working correctly. We are ready to move to Kubernetes.

## Starting the Minikube Cluster

Now we need a Kubernetes cluster to deploy Ollama into. We will use `Minikube`, which spins up a single-node Kubernetes cluster inside a Docker container on your local machine. 

We start Minikube with 8GB of memory and 6 CPU cores allocated — enough to run Ollama and the monitoring stack simultaneously:

```bash
minikube start --memory=8192 --cpus=6 --driver=docker
```

Minikube will pull the required images and configure kubectl to point to the new cluster:

```bash
amanpandey@aman-fedora:~$ minikube start --memory=8192 --cpus=6 --driver=docker
😄  minikube v1.36.0 on Fedora 42
✨  Using the docker driver based on user configuration
📌  Using Docker driver with root privileges
👍  Starting "minikube" primary control-plane node in "minikube" cluster
🚜  Pulling base image v0.0.47 ...
🎉  minikube 1.38.1 is available! Download it: https://github.com/kubernetes/minikube/releases/tag/v1.38.1
💡  To disable this notice, run: 'minikube config set WantUpdateNotification false'

🔥  Creating docker container (CPUs=6, Memory=8192MB) ...
❗  Failing to connect to https://registry.k8s.io/ from both inside the minikube container and host machine
💡  To pull new external images, you may need to configure a proxy: https://minikube.sigs.k8s.io/docs/reference/networking/proxy/
🐳  Preparing Kubernetes v1.33.1 on Docker 28.1.1 ...
    ▪ Generating certificates and keys ...
    ▪ Booting up control plane ...
    ▪ Configuring RBAC rules ...
🔗  Configuring bridge CNI (Container Networking Interface) ...
🔎  Verifying Kubernetes components...
    ▪ Using image gcr.io/k8s-minikube/storage-provisioner:v5
🌟  Enabled addons: storage-provisioner, default-storageclass
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
```

Verify the cluster is running using below commands:

```bash
minikube status
kubectl get nodes
```

```bash
minikube
type: Control Plane
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured

NAME       STATUS   ROLES           AGE     VERSION
minikube   Ready    control-plane   5m47s   v1.33.1
```

The node is ready. Here is the full architecture we are building:

```
┌─────────────────────────────────────────┐
│           Minikube Cluster              │
│                                         │
│  ┌─────────────┐   ┌─────────────────┐  │
│  │Ollama Pod   │   │ Prometheus Pod  │  │
│  │(mistral 7B) │   │ (metrics)       │  │
│  └─────────────┘   └─────────────────┘  │
│         │                  │            │
│  ┌─────────────┐   ┌─────────────────┐  │
│  │Ollama Svc   │   │  Grafana Pod    │  │
│  │(port 11434) │   │  (dashboards)   │  │
│  └─────────────┘   └─────────────────┘  │
└─────────────────────────────────────────┘
         │
┌─────────────────┐
│ Streamlit UI    │  ← runs on your local machine
│ (chatbot)       │
└─────────────────┘
```

## Deploying Ollama on Kubernetes

With our cluster running, we can now deploy Ollama as a proper Kubernetes workload. This involves three Kubernetes resources working together:

- **Namespace** — an isolated environment called `llm` to keep all our LLM-related resources separate from the monitoring stack
- **PersistentVolumeClaim** — a 10GB storage volume so the downloaded model survives pod restarts (without this, every time the pod restarts, Mistral would have to be downloaded again)
- **Deployment + Service** — the Ollama container itself, with CPU/memory resource limits, and a NodePort service to expose it

Create a working directory and the deployment manifest:

```bash
mkdir -p ~/llm-assignment && cd ~/llm-assignment
```

```bash
cat > ollama-deployment.yaml << 'EOF'
apiVersion: v1
kind: Namespace
metadata:
  name: llm
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: ollama-pvc
  namespace: llm
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ollama
  namespace: llm
spec:
  replicas: 1
  selector:
    matchLabels:
      app: ollama
  template:
    metadata:
      labels:
        app: ollama
    spec:
      containers:
      - name: ollama
        image: ollama/ollama:latest
        ports:
        - containerPort: 11434
        volumeMounts:
        - name: ollama-storage
          mountPath: /root/.ollama
        resources:
          requests:
            memory: "4Gi"
            cpu: "2"
          limits:
            memory: "8Gi"
            cpu: "4"
      volumes:
      - name: ollama-storage
        persistentVolumeClaim:
          claimName: ollama-pvc
---
apiVersion: v1
kind: Service
metadata:
  name: ollama-service
  namespace: llm
spec:
  selector:
    app: ollama
  ports:
  - port: 11434
    targetPort: 11434
  type: NodePort
EOF
```

Apply it:

```bash
kubectl apply -f ollama-deployment.yaml
```
Output:
```bash
amanpandey@aman-fedora:~/Downloads/llm-assignment$ kubectl apply -f ollama-deployment.yaml
namespace/llm created
persistentvolumeclaim/ollama-pvc created
deployment.apps/ollama created
service/ollama-service created
```

Now watch the pod come up where kubernetes will pull the `ollama/ollama:latest` docker image and start the container:

```bash
kubectl get pods -n llm 
```
you can cross check whether it is pulling correctly or not using below command:
```bash
amanpandey@aman-fedora:~/Downloads/llm-assignment$ minikube ssh "docker pull ollama/ollama:latest"
latest: Pulling from ollama/ollama
b40150c1c271: Already exists 
2d0e9b7d523c: Already exists 
c3172a042993: Already exists 
040ccae19707: Pull complete 
Digest: sha256:d3d553bdfbcc7f55dd5ddf42c4cbe3a927aa9bb1802710d35e94656ca5aea02b
Status: Image is up to date for ollama/ollama:latest
docker.io/ollama/ollama:latest
``` 
Wait until the `STATUS` column shows `Running`:

```bash
amanpandey@aman-fedora:~/Downloads/llm-assignment$ kubectl get pods -n llm
NAME                      READY   STATUS    RESTARTS   AGE
ollama-7f4b577b8b-sfhjg   1/1     Running   0          20m
```

The Ollama server is now running inside your Kubernetes cluster. However, it does not have any model loaded yet — the pod is just the runtime. We need to pull Mistral into it next.

## Pulling Mistral Inside the K8s Pod

Just like you would `docker exec` into a running container to run commands, Kubernetes has `kubectl exec` that lets you run commands directly inside a pod. We use this to pull the Mistral model into the Ollama pod's persistent storage.

```bash
kubectl exec -it -n llm ollama-7f4b577b8b-sfhjg -- ollama pull mistral
```
This will download Mistral inside the pod and below is output. 
```bash
amanpandey@aman-fedora:~/Downloads/llm-assignment$ kubectl exec -it -n llm ollama-7f4b577b8b-sfhjg -- ollama pull mistral
pulling manifest 
pulling f5074b1221da: 100%  4.4 GB                         
pulling 43070e2d4e53: 100%   11 KB                         
pulling 1ff5b64b61b9: 100%   799 B                         
pulling ed11eda7790d: 100%    30 B                         
pulling 1064e17101bd: 100%   487 B                         
verifying sha256 digest 
writing manifest 
success 
```

Once done, verify the model works inside the pod:

```bash
amanpandey@aman-fedora:~/Downloads/llm-assignment$ kubectl exec -it -n llm  ollama-7f4b577b8b-sfhjg -- ollama run mistral "Which model are you?"
 I am a model of the conversation AI developed by Mistral AI. We don't have specific names but I was trained on a variety of internet text to 
help answer questions, generate creative content, and converse with people in an engaging manner. How can I assist you today?
```

Now set up port forwarding so your local machine can reach the Ollama API running inside the cluster:

```bash
kubectl port-forward -n llm svc/ollama-service 11435:11434 
```

This maps port `11435` on your local machine to port `11434` inside the cluster. We use `11435` (instead of `11434`) to avoid a conflict with the local Ollama service we installed earlier.

Test it from your host machine:

```bash
curl http://localhost:11435/api/generate \
  -d '{
    "model": "mistral",
    "prompt": "Which model are you?",
    "stream": false
  }'
```

If you get a valid JSON response, Mistral is running inside Kubernetes and is accessible from the outside. The LLM deployment is complete.

## Setting Up Prometheus and Grafana

Deploying a model is only half the story. In a production environment, you also need to monitor what is happening inside your cluster — CPU usage, memory pressure, pod restarts, and overall node health. This is where Prometheus and Grafana come in.

`Prometheus` is a monitoring system that scrapes metrics from Kubernetes components every few seconds and stores them in a time-series database. `Grafana` is a visualization tool that connects to Prometheus and turns those raw metrics into beautiful, interactive dashboards.

Instead of installing these manually, we use the `kube-prometheus-stack` Helm chart, which bundles both tools together along with pre-configured alert rules and dashboards for Kubernetes.

Add the required Helm repositories:

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
```

Install the full monitoring stack into its own `monitoring` namespace:

```bash
helm install monitoring prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace \
  --set grafana.adminPassword=admin123 \
  --set prometheus.prometheusSpec.retention=24h
```
This single command deploys Prometheus, Grafana, AlertManager, and a set of node exporters that collect host-level metrics. Wait 2–3 minutes and then check that all pods are running:

```bash
kubectl get pods -n monitoring
```

```bash
amanpandey@aman-fedora:~$ kubectl get pods -n monitoring 
NAME                                                     READY   STATUS    RESTARTS   AGE
alertmanager-monitoring-kube-prometheus-alertmanager-0   2/2     Running   0          26m
monitoring-grafana-6b54f65456-c2lhs                      3/3     Running   0          32m
monitoring-kube-prometheus-operator-594b56f796-8x5k9     1/1     Running   0          32m
monitoring-kube-state-metrics-7d69554b96-8d7dc           1/1     Running   0          32m
monitoring-prometheus-node-exporter-mfzhh                1/1     Running   0          32m
prometheus-monitoring-kube-prometheus-prometheus-0       2/2     Running   0          26m
```

All six components are running. Here is what each one does:

- **alertmanager** — handles alert routing and notifications
- **monitoring-grafana** — the visualization dashboard UI
- **kube-prometheus-operator** — manages the Prometheus deployment lifecycle
- **kube-state-metrics** — exposes Kubernetes object metrics (pods, deployments, etc.)
- **prometheus-node-exporter** — collects host-level metrics like CPU, RAM, and disk
- **prometheus** — the core metrics database

## Accessing the Grafana Dashboard

Now let's open Grafana in the browser. We use port forwarding again to expose the Grafana service locally. Open a new terminal and run:

```bash
kubectl port-forward -n monitoring svc/monitoring-grafana 3000:80 
```

Then port-forward for Prometheus:

```bash
kubectl port-forward -n monitoring svc/monitoring-kube-prometheus-prometheus 9090:9090
```

Open your browser and go to http://localhost:3000. Log in with:

- **Username:** `admin`
- **Password:** `admin123`

### Importing Kubernetes Dashboards

Grafana supports importing community-built dashboards using a numeric ID. These pre-built dashboards give you instant visibility into your cluster without writing a single query.

`Dashboard 1 — Kubernetes Cluster Overview:`

1. Click the **"+"** icon in the left sidebar and select **"Import"**
2. Enter dashboard ID `15661` and click **"Load"**
3. Select **"Prometheus"** as the data source
4. Click **"Import"**

`Dashboard 2 — Kubernetes Pod and Node Metrics:`

1. Click **"+"** → **"Import"**
2. Enter ID `6417` and click **"Load"**
3. Select **"Prometheus"** → **"Import"**

Once imported, you will see live graphs showing CPU usage, memory consumption, pod counts, and network traffic across your Minikube node. As you interact with the chatbot in the next step, you will see the CPU and memory graphs spike in real time — a clear visual confirmation that the LLM inside the cluster is actually doing work.

## Building the Streamlit Chatbot UI

The final piece is a chatbot interface that sends user messages to Mistral running inside the cluster and displays the responses. We build this using `Streamlit`, a Python library that lets you create web UIs with just a few lines of code.

Install Streamlit:

```bash
pip install streamlit requests --break-system-packages
```

Create the chatbot file:

```bash
cat > chatbot.py << 'EOF'
import streamlit as st
import requests
import time

# Config
OLLAMA_URL = "http://localhost:11435/api/generate"
MODEL_NAME = "mistral"

st.set_page_config(
    page_title="Mistral 7B Chatbot",
    page_icon="🤖",
    layout="centered"
)

st.title("🤖 Mistral 7B — Open Source LLM")
st.caption("Running on Kubernetes via Ollama | Monitored by Grafana + Prometheus")

# Sidebar info
with st.sidebar:
    st.header("📊 Model Info")
    st.info("""
    **Model:** Mistral 7B Q4_K_M
    **Runtime:** Ollama
    **Deployed on:** Kubernetes (Minikube)
    **Monitoring:** Grafana + Prometheus
    """)
    st.header("💡 Try These Questions")
    st.markdown("""
    - Which model are you?
    - What's the latest information you have?
    - Explain Kubernetes in simple terms
    - What are your limitations?
    - Write a Python hello world
    """)
    if st.button("🗑️ Clear Chat"):
        st.session_state.messages = []
        st.rerun()

# Chat history
if "messages" not in st.session_state:
    st.session_state.messages = []

# Display chat history
for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])
        if "time" in msg:
            st.caption(f"⏱️ Response time: {msg['time']:.2f}s")

# Chat input
if prompt := st.chat_input("Ask Mistral anything..."):
    # Show user message
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    # Get response from Ollama
    with st.chat_message("assistant"):
        with st.spinner("Thinking..."):
            start = time.time()
            try:
                response = requests.post(
                    OLLAMA_URL,
                    json={
                        "model": MODEL_NAME,
                        "prompt": prompt,
                        "stream": False
                    },
                    timeout=120
                )
                elapsed = time.time() - start
                reply = response.json()["response"]
                st.markdown(reply)
                st.caption(f"⏱️ Response time: {elapsed:.2f}s")
                st.session_state.messages.append({
                    "role": "assistant",
                    "content": reply,
                    "time": elapsed
                })
            except Exception as e:
                st.error(f"❌ Error connecting to Ollama: {e}")
                st.info("Make sure port-forward is running: kubectl port-forward -n llm svc/ollama-service 11435:11434")
EOF
```

Run the chatbot:

```bash
cd ~/llm-assignment
streamlit run chatbot.py
```

Streamlit will open the UI automatically at `http://localhost:8501`. You can now type questions directly in the chat input. Try the same questions we used during testing:

- **Which model are you?** — Mistral will identify itself
- **Explain Kubernetes in simple terms** — a good test of its general knowledge quality

Each response will show a response time counter, so you can see exactly how fast the model is running on your hardware.

## Conclusion

In this guide, we covered a complete end-to-end deployment of an open source LLM on Kubernetes. We started by using `llmfit` to make a hardware-aware model selection decision — an important step that most tutorials skip entirely. We then deployed Mistral 7B via Ollama into a Kubernetes cluster, set up real-time monitoring with Grafana and Prometheus, and built a working chatbot UI to interact with the model.

The key takeaway is that running LLMs reliably is not just about getting the model to respond — it is about treating it like any other production workload: with proper resource management, persistent storage, health monitoring, and a clean API interface.

Whether you are building a private assistant, an internal tool, or just learning how LLM infrastructure works, this setup gives you a solid foundation to build on. The same patterns — namespaced deployments, PVCs for model storage, Helm-based monitoring stacks — apply equally when you move from Minikube to a real cloud cluster.