---
title: "Docker In Depth: The Complete Guide to Containerized Development"
slug: "docker-in-depth"
banner: "/projects/dockerbanner.png"
author: "Aman Pandey"
authorImage: "/projects/myimg.jpg" 
date: "June 15, 2025"
summary: "Docker has revolutionized the way we build, deploy, and scale applications. In this comprehensive blog, we’ll take a deep dive into Docker from understanding the fundamentals of containerization to mastering advanced concepts like Docker Compose, Docker Swarm, Volume and networking."
tags: ["Docker", "Containers"]
---

<img src="/projects/dockerbanner.png" alt="Redux Toolkit" style="margin-bottom: 28px;" />

Docker is a powerful platform designed to simplify the process of building, sharing, and running applications inside containers. A container is a lightweight, standalone environment that includes everything an application needs its code, libraries, and its all the dependencies so it runs reliably no matter where it's deployed.

Containers can be started anywhere an [OCI container runtime](https://opencontainers.org/) is available, whether on your workstation with Docker, or in the cloud using orchestrators like Kubernetes. This narrows the gap between development and production.

In this blog, we’ll guide you through everything from installing Docker to mastering its core concepts, supported by hands-on examples and practical use cases.

### Table of Contents

1. [Getting Started With Docker](#getting-started-with-docker)  
2. [Basics of Docker with Demo](#basics-of-docker-with-demo)
3. [Docker Vs Virtual Machine](#docker-vs-virtual-machine)  
4. [Docker Commands with Example](#docker-commands-with-example)  
5. [Docker Network Concept and Demo](#docker-network-concept-and-demo)  
6. [Dockerfile – Building Our Own Docker Image](#dockerfile---building-our-own-docker-image)  
7. [Private Docker Repository – Pushing Our Built Docker Image into a Private Registry on AWS](#private-docker-repository---pushing-our-built-docker-image-into-a-private-registry-on-aws)  
8. [Docker Compose – Running Multiple Services](#docker-compose---running-multiple-services)  
9. [Docker Volumes – Persist Data in Docker](#docker-volumes---persist-data-in-docker)

## Getting Started With Docker

Docker is available in two main variants: **Docker Engine** and **Docker Desktop**. The Docker Engine is primarily used on Linux systems and includes the core daemon (dockerd) and the Docker CLI for interacting with it. Docker Desktop, on the other hand, provides a complete Docker environment for Windows, macOS, and even Linux by leveraging virtualization. It offers a graphical dashboard for managing containers alongside the standard Docker CLI.

If you’re using Windows or macOS, visit the official [Docker installation guide](https://docs.docker.com/get-started/get-docker) and install docker desktop, download the version suited for your operating system, run the installer, and launch Docker Desktop from your applications. Once it's running, you can open a terminal and start using Docker commands.

### Installing Docker on Fedora Linux

You can install Docker on fedora linux in different ways, depending on your needs:

- You can set up **Docker's repositories** and install from them, for ease of installation and upgrade tasks. This is the recommended approach.

- You can download the **RPM package**, install it manually, and manage upgrades completely manually. So lets start with first way. 

Follow these quick steps to install Docker Engine on your Fedora system using the official Docker repository:

#### Step 1: Set Up the Repository

Install the dnf-plugins-core package (which provides the commands to manage your DNF repositories) and set up the repository.

```bash
$ sudo dnf -y install dnf-plugins-core
$ sudo dnf-3 config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
```

#### Step 2: Install Docker Engine

Now install Docker Engine, CLI tools, and related plugins:

```bash
$ sudo dnf install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Complete the installation by adding yourself to the docker group. This allows you to run docker CLI commands without using sudo.

```bash
$ sudo groupadd docker
$ sudo usermod -aG docker $USER
```

#### Step 3: Start and Enable Docker

```bash
$ sudo systemctl start docker
$ sudo systemctl enable docker
```
You can now verify Docker is running: 
```bash
$ docker --version
```

### Check Docker Working?

Once you’ve installed Docker, you can check it’s working by starting a basic container. The hello-world image on Docker Hub is a good choice. Always remember one thing i.e if you write **docker pull hello-world** in terminal then it only pull image from Docker Hub and not run container from that image. Hence if u want to run container too so please consider **docker run** which will do both pull and run simultaneously. 

Run the following command to start a container with the image:

```bash
$ docker run hello-world:latest  # latest is the default tag, you can add specific version  
```
if you see this output then your docker installation is ready to use.

```bash
[amanpandey@aman-fedora ~]$ docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
e6590344b1a5: Pull complete 
Digest: sha256:940c619fbd418f9b2b1b63e25d8861f9cc1b46e3fc8b018ccfe8b78f19b8cc4f
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```
As u see above then first few lines show the Docker daemon recognizing that you’ve never used the hello-world image before, so it has to download it from Docker Hub.

## Basics of Docker with Demo

Before You Start Using Docker, its very essential to know about:

- **Image:** All container start from image, The image defines the initial state of the container’s filesystem. Prebuilt images are available in public repositories such as Docker Hub.

- **Containers:** Container is an instance of an image. A way to package application with all the necessary dependencies and configuration. it's Portable artifact, easily shared and moved around. Makes development and deployment more efficient.

In a programming languages example java, if u know about class and object then u may relate easily with image and container. 

## Docker Vs Virtual Machine

<img src="/projects/docker.png" alt="docker" style="margin-bottom: 28px;" />

The key difference between containers and virtual machines is that virtual machines virtualize an entire machine down to the hardware layers and containers only virtualize applicaation layer above the operating system level.

This Virtualization is the reason of below points:

- **Size** - Docker Image is much Smaller.
- **Docker** - Containers start and run much fast.
- **Compatibility** - VM of any OS can run on any OS host. 

One of the key strengths of Virtual Machines (VMs) is their cross-platform compatibility. This works because the hypervisor creates a virtual hardware layer that abstracts away the underlying host OS. This allows the guest OS to operate as if it’s running on its native hardware, regardless of the actual host system. meanwhile Docker does not use a traditional hypervisor. Instead, it relies on OS-level virtualization, Docker uses the host machine's OS kernel directly to run containers.

## Docker Commands with Example

In this section, we'll get hands-on with Docker commands by working with a real-world public image present on Docker Hub i.e Redis. This will help you understand how Docker commands work in practice, from pulling images to running containers and inspecting them. Before jumping to our this topic, lets understand, **What is Docker Hub?**.

Docker Hub is a container registry built for developers and open-source contributors to find, use, and share container images. It provides access to verified images from trusted publishers, official Docker images, and public or private repositories, making it easy to collaborate and distribute containerized applications securely and efficiently.

Let’s start by pulling the official Redis image from Docker Hub: Visit [Docker Hub](https://hub.docker.com/) official Website.

<img src="/projects/redis.png" alt="docker" style="margin-bottom: 28px;" />

1. **Run Below Command to start pulling this public redis image from docker hub:**
```bash
docker pull redis
```
This command downloads the latest Redis image from Docker Hub to your local system, Below is the output of your above action.
```bash
[amanpandey@aman-fedora ~]$ docker pull redis
Using default tag: latest
latest: Pulling from library/redis
dad67da3f26b: Pull complete 
b90a44fe26dc: Pull complete 
11c0ea983116: Pull complete 
4bce6440352d: Pull complete 
093c29d9fea9: Pull complete 
4f4fb700ef54: Pull complete 
b222156a9022: Pull complete 
Digest: sha256:1b835e5a8d5db58e8b718850bf43a68ef5a576fc68301fd08a789b20b4eecb61
Status: Downloaded newer image for redis:latest
docker.io/library/redis:latest
```
2. **List all Local images**
```bash
docker images
```
After pulling redis image, above command will list all the images present in your local: Check Below
```bash
[amanpandey@aman-fedora ~]$ docker images
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
redis        latest    c09c2832ba40   2 weeks ago   128MB
```
3. **Now once the image gets pulled, lets run the container from Redis Image by below command:**
```bash
docker run redis
```
After hitting this command your container started to run in **Attached mode**(remember this) and below is output:
```bash
[amanpandey@aman-fedora ~]$ docker run redis
Starting Redis Server
1:C 15 Jun 2025 19:05:35.855 
1:C 15 Jun 2025 19:05:35.855 * oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
1:C 15 Jun 2025 19:05:35.855 * Redis version=8.0.2, bits=64, commit=00000000, modified=1, pid=1, just started
1:C 15 Jun 2025 19:05:35.855 * Configuration loaded
1:M 15 Jun 2025 19:05:35.856 * monotonic clock: POSIX clock_gettime
1:M 15 Jun 2025 19:05:35.857 * Running mode=standalone, port=6379.
1:M 15 Jun 2025 19:05:35.858 * <bf> RedisBloom version 8.0.1 (Git=unknown)
1:M 15 Jun 2025 19:05:35.858 * <bf> Registering configuration options: [
1:M 15 Jun 2025 19:05:35.858 * <bf> 	{ bf-error-rate       :      0.01 }
1:M 15 Jun 2025 19:05:35.858 * <bf> 	{ bf-initial-size     :       100 }
1:M 15 Jun 2025 19:05:35.858 * <bf> 	{ bf-expansion-factor :         2 }
1:M 15 Jun 2025 19:05:35.858 * <bf> 	{ cf-bucket-size      :         2 }
1:M 15 Jun 2025 19:05:35.858 * <bf> 	{ cf-initial-size     :      1024 }
1:M 15 Jun 2025 19:05:35.858 * <bf> 	{ cf-max-iterations   :        20 }
1:M 15 Jun 2025 19:05:35.858 * <bf> 	{ cf-expansion-factor :         1 }
1:M 15 Jun 2025 19:05:35.858 * <bf> 	{ cf-max-expansions   :        32 }
1:M 15 Jun 2025 19:05:35.858 * <bf> ]
1:M 15 Jun 2025 19:05:35.858 * Module 'bf' loaded from /usr/local/lib/redis/modules//redisbloom.so
1:M 15 Jun 2025 19:05:35.861 * <search> Redis version found by RedisSearch : 8.0.2 - oss
1:M 15 Jun 2025 19:05:35.861 * <search> RediSearch version 8.0.1 (Git=5688fcc)
1:M 15 Jun 2025 19:05:35.861 * <search> Low level api version 1 initialized successfully 
1:M 15 Jun 2025 19:05:35.861 * <search> Initialized thread pools!
1:M 15 Jun 2025 19:05:35.861 * <search> Disabled workers threadpool of size 0
1:M 15 Jun 2025 19:05:35.861 * <search> Subscribe to config changes
1:M 15 Jun 2025 19:05:35.861 * <search> Enabled role change notification
1:M 15 Jun 2025 19:05:35.862 * <search> Cluster configuration: AUTO partitions, type: 0, coordinator timeout: 0ms
1:M 15 Jun 2025 19:05:35.862 * <search> Register write commands
1:M 15 Jun 2025 19:05:35.863 * <timeseries> Redis version found by RedisTimeSeries : 8.0.2 - oss
1:M 15 Jun 2025 19:05:35.865 * <ReJSON> Enabled diskless replication
1:M 15 Jun 2025 19:05:35.865 * <ReJSON> Initialized shared string cache, thread safe: false.
1:M 15 Jun 2025 19:05:35.865 * Module 'ReJSON' loaded from /usr/local/lib/redis/modules//rejson.so
1:M 15 Jun 2025 19:05:35.865 * <search> Acquired RedisJSON_V5 API
1:M 15 Jun 2025 19:05:35.866 * Server initialized
1:M 15 Jun 2025 19:05:35.866 * Ready to accept connections tcp
```
As you can see the current container running in **Attached Mode**, So if you want to terminate it then hit **ctrl c**, but again it will stops your running container. so if you want to avoid this then run your containers in **detach mode**. Run below Command for running your containers in detach mode.

```bash
docker run -d redis
``` 
The **-d** flag instructs the **Docker CLI** to detach from the container, leaving the process running in the background. You’ll be dropped back to your terminal prompt.

4. **List all running containers:** Run **docker ps** 
```bash
[amanpandey@aman-fedora ~]$ docker ps
CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS      NAMES
f42b6cda4b59   redis     "docker-entrypoint.s…"   9 seconds ago   Up 9 seconds   6379/tcp   flamboyant_nobel
```
5. **To see all your containers, including stopped and exited ones, add the -a flag:**
```bash
[amanpandey@aman-fedora ~]$ docker ps -a
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS                     PORTS      NAMES
f42b6cda4b59   redis     "docker-entrypoint.s…"   3 minutes ago    Up 3 minutes               6379/tcp   flamboyant_nobel
77a836ac24cf   redis     "docker-entrypoint.s…"   56 minutes ago   Exited (0) 5 minutes ago              dreamy_bhabha
```
Now you are thinking, why we have two containers in this list? So the answer is every time you hit: **docker run redis**, Docker creates a brand new container instance from the redis image. That's because docker run is essentially a shortcut for two commands:
```bash
docker create redis  # creates a new container
docker start <container-id>  # starts it
```
So when you run it multiple times, Docker keeps making new containers, even if you're using the same image. to avoid creating a new container each time use docker start instead of docker run.

6. **The command provides each container’s ID and current status**
- To get more detailed information about an individual container, pass its ID or name to docker inspect:
```bash
docker inspect 77a836ac24cf 
```

7. **Starting, Stopping, and Deleting Containers**

- Detached containers can be stopped by passing their ID or name to the **docker stop** command:
```bash
[amanpandey@aman-fedora ~]$ docker ps
CONTAINER ID   IMAGE     COMMAND                  CREATED             STATUS             PORTS      NAMES
f42b6cda4b59   redis     "docker-entrypoint.s…"   About an hour ago   Up About an hour   6379/tcp   flamboyant_nobel
[amanpandey@aman-fedora ~]$ docker stop f42b6cda4b59
f42b6cda4b59
[amanpandey@aman-fedora ~]$ docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES   #now u can see there is no running containers present
```
- Use the **docker start** command to restart the container:
```bash
docker start 42b6cda4b59
```
- To remove a container, run **docker rm** with the container’s ID or name:
```bash
docker rm 42b6cda4b59  #container must stop before removing
```
- If the container’s running, you’ll need to add the **--force** flag to confirm your intentions:
```bash
docker rm 42b6cda4b59 --force
```

8. **Removing Images**
- To delete an image, pass its ID or tag to docker rmi:
```bash
docker rmi redis
```
**Note:** Images can’t be deleted if they’re being used by a running or stopped container. Remove all the containers associated with it first, then remove image.

