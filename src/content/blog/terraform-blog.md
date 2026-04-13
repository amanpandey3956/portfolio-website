---
title: "Terraform for Beginners: A Complete Hands-On Guide"
slug: "terraform-blog"
banner: "/projects/terraform-banner.webp"
author: "Aman Pandey"
authorImage: "/projects/myimg.webp" 
date: "April 12, 2026"
summary: "A beginner-friendly deep dive into Terraform covering HCL basics, state management, lifecycle rules, provisioners, remote backends, and AWS resource provisioning — with clear examples throughout."
tags: ["Terraform", "AWS"]
---

<img src="/projects/terraform-big-banner.webp" alt="Terraform Banner" style="margin-bottom: 28px;" />

## Getting Started with Terraform

### Terraform Introduction

Terraform is a tool that helps you create and manage infrastructure using code instead of doing everything manually. In simple terms, instead of going to a cloud console and clicking multiple options to create servers, networks, or databases, you just write a configuration file and Terraform takes care of the rest.

It is developed by HashiCorp and is widely used in DevOps for managing infrastructure in a faster and more reliable way.Terraform follows the concept of Infrastructure as Code (IaC), where your entire infrastructure is written in a readable format, stored in files, and can be reused anytime.

#### How Terraform Works?

Terraform interacts with different platforms (like cloud providers or services) using APIs.

<img src="/projects/terraform.webp" alt="Terraform" style="margin-bottom: 28px;" />

Terraform uses something called providers to connect with platforms like AWS, Azure, or others. These providers act like a bridge between Terraform and the service you want to use.

#### The Three Phases of Terraform

Terraform operations are divided into three distinct phases:

- **Init Phase:** Terraform initializes the project and downloads the necessary providers for the specified environment.
- **Plan Phase:** Terraform creates a detailed execution plan that outlines the changes required to achieve the desired      infrastructure state.
- **Apply Phase:** Terraform implements the planned changes, ensuring that your environment matches the configuration. If   there is any drift from the defined state, running terraform apply again will correct the discrepancies.

#### Why Use Terraform?

- Terraform allows you to manage infrastructure in a consistent and repeatable way using simple configuration files.
- It supports multiple platforms through providers, so you can manage everything in one place.
- It keeps track of your infrastructure using a state file and shows a plan before making any changes.
- Since it follows a declarative approach, you only define the desired outcome and Terraform handles the execution.

**Note:** Before moving forward, make sure you have [Terraform installed](https://developer.hashicorp.com/terraform/install) on your system.

### Basics of HashiCorp Configuration Language (HCL)

Terraform uses a language called HCL (HashiCorp Configuration Language) to define infrastructure in a simple and readable way.

In HCL, everything is written using blocks and key-value pairs. Each block represents a resource (like a server, file, or storage), and inside the block you define its configuration. For instance, you might want to create a file on the local system where Terraform is installed.

First, create a directory for your configuration file in the /root directory:

```bash
$ mkdir /root/terraform-local-file
$ cd /root/terraform-local-file
```
Within this directory, create a configuration file (e.g., local.tf) and define a generic block structure:

```hcl
<block> <parameters> {
    key1 = value1
    key2 = value2
}
```

Next, define a resource block in local.tf to create a local file. Inside the block, specify the file name and content using block arguments:

```hcl
resource "local_file" "colors" {
  filename = "/root/colors.txt"
  content  = "I love green color!"
}
```

Let's break down the above configuration in two parts i.e block identification and resource type requirement.

**1] Block Identification:** 
The block starts with the `resource` keyword and is identified by curly braces. It consists of three parts:

- **Resource Type:** `local_file` indicates that the local provider is used.
- **Resource Name:** The logical name `colors` uniquely identifies this resource.
- **Block Arguments:** These key-value pairs specify resource parameters. For example: `filename` sets the absolute path `/  root/colors.txt` where file is created & `content` provides the text content for the file.

**2] Resource Type Requirements:** 
The `local_file` resource requires the arguments `filename` and `content`. When working with other providers such as AWS, Azure, or GCP, different resource types may require a different set of arguments. Consult Terraform’s documentation for details on the necessary arguments for each resource type.

Below are additional examples for other providers such as AWS EC2 instance and S3 bucket respectively:

**AWS EC2 Instance Example**

```hcl
resource "aws_instance" "app-server" {
  ami           = "ami-0d5fe378a1ff4d"
  instance_type = "t2.small"
}
```

**AWS S3 Bucket Example**

```hcl
resource "aws_s3_bucket" "app-data" {
  bucket = "appserver-bucket-1213"
  acl    = "private"
}
```

**Terraform Workflow (Using HCL)**

A typical Terraform workflow involves the following steps:

**1. Write the Configuration File:**
Create and edit your Terraform configuration file (e.g., local.tf).

**2. Initialize the Working Directory:**
This step checks your configuration file and downloads the necessary provider plugins.

```bash
$ terraform init
```

Below is Example Output:

```hcl
Initializing the backend...

Initializing provider plugins...
- Finding latest version of hashicorp/local...
- Installing hashicorp/local v1.5.0...
- Installed hashicorp/local v1.5.0 (signed by HashiCorp)

The following providers do not have any version constraints in configuration,
so the latest version was installed.
To prevent automatic upgrades to new major versions that may contain breaking
changes, we recommend adding version constraints in a required_providers block
in your configuration, with the constraint strings suggested below.

* hashicorp/local: version = "~> 1.5.0"

Terraform has been successfully initialized!
```

**3. Review the Plan:**
Use the `terraform plan` command to see what terraform is actually going to do.

```bash
$ terraform plan
```

The output provides a diff-like summary showing what will be created, modified, or destroyed. For example, a plus symbol (+) next to the `local_file.colors` resource indicates that it will be created.

**Example Output:**

```hcl
An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
   + create

Terraform will perform the following actions:

  # local_file.colors will be created
  + resource "local_file" "colors" {
      + content              = "I love green color!"
      + directory_permission = "0777"
      + file_permission      = "0777"
      + filename             = "/root/colors.txt"
      + id                   = (known after apply)
    }

Plan: 1 to add, 0 to change, 0 to destroy.
```

**4. Finally Apply the Configuration:**
Execute the following command to apply the configuration and create the resource:

```bash
$ terraform apply
```

Confirm the execution by typing **yes** when prompted.

**Final Example output:**

```hcl
An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
    + create

Terraform will perform the following actions:

    # local_file.colors will be created
    + resource "local_file" "colors" {
        + content             = "I love green color!"
        + directory_permission = "0777"
        + file_permission      = "0777"
        + filename            = "/root/colors.txt"
        + id                  = (known after apply)
    }

Plan: 1 to add, 0 to change, 0 to destroy.

Do you want to perform these actions?
Terraform will perform the actions described above.
Only 'yes' will be accepted to approve.

Enter a value: yes
local_file.colors: Creating...
local_file.colors: Creation complete after 0s [id=521c5er5fd3ght6frsg56bh34dc57gr115b55]
Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

After applying the configuration, verify the creation of the file using the cat command or inspect the resource details with:

```bash
$ terraform show
```

### Updating, and Destroying Infrastructure

In Terraform, you can not only create resources but also update and delete them easily using simple commands.

In earlier steps, we saw how to create a resource. Now let’s understand how to **modify** and **remove** it.

#### Update Resources

Let’s update the resources by considering our same previous example again where we will update its file permission from default (0777) to a more secure permission (0700).

Below is the updated Terraform configuration:

```hcl
resource "local_file" "colors" {
  filename        = "/root/colors.txt"
  content         = "I love green color!"
  file_permission = "0700"
}
```

When you run:

```bash
terraform plan
```

Terraform will detect the change and show that the resource needs to be replaced where you might see a symbol like `-/+`, which means to show that Terraform will destroy the existing file and create a new one with the updated permissions.

```hcl
$ terraform plan
local_file.colors: Refreshing state...
[id=5f8fb9gh65dft78hgtdf6ca1fd3c11bdf]

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
   -/+ destroy and then create replacement

Terraform will perform the following actions:

# local_file.colors must be replaced.
-/+ resource "local_file" "colors" {
      content             = "I love green color!"
      directory_permission = "0777"
  ~ file_permission      = "0777" -> "0700" # forces replacement
      filename            = "/root/colors.txt"
  ~ id                   = "5f8fb9gh65dft78hgtdf6ca1fd3c11bdf" -> (known after apply)
}

Plan: 1 to add, 0 to change, 1 to destroy.

Note: You didn't specify an "-out" parameter to save this plan, so Terraform can't guarantee that exactly these actions will be performed if "terraform apply" is subsequently run.
```

To proceed with applying these changes, run the `Terraform apply` command. Confirm the action by typing “yes” when prompted, after that Terraform will delete the old resource & create a new one with updated configuration.

#### Destroy Resources
When you need to completely delete the infrastructure, use the `Terraform destroy` command. Running this command will generate an execution plan that shows every attribute of the resource marked for deletion. The minus (-) sign means the resource will be deleted. Once you confirm, all resources in that configuration will be permanently removed. 

## Basics of Terraform

### Understanding Providers

Terraform uses providers to connect with platforms like AWS, Azure, or local systems and manage resources.

After writing your configuration, run:

```bash
terraform init
```

This command downloads the required provider plugins and prepares your project.

**Provider Types**

| Provider Type       | Description                        | Examples       |
| ------------------- | ---------------------------------- | -------------- |
| Official Providers  | Maintained by HashiCorp            | AWS, Azure     |
| Partner Providers   | Managed by third-party companies   | DigitalOcean   |
| Community Providers | Created by individual contributors | Custom plugins |

**Provider Source Address**

A provider like `hashicorp/local` is called a source address, which Terraform uses to download it.

It has two main parts:

- Namespace → hashicorp (organization name)
- Provider name → local

You can also include a full path like: `registry.terraform.io/hashicorp/local` & If not specified, Terraform automatically uses the default registry.

### Input Variables

Input variables in Terraform help you make your code **flexible and reusable** instead of hardcoding values.

Instead of writing fixed values in your configuration, you can use variables and change them easily whenever needed.

**Traditional Hard-Coded Resources**

```hcl
resource "local_file" "colors" {
  filename = "/root/colors.txt"
  content  = "I love green color!"
}
```

**Using Variables**

Firstly create a configuration file named `variables.tf`. In this file, you define each variable using the variable keyword and can optionally assign a default value:

```hcl
variable "filename" {
  default = "/root/colors.txt"
}

variable "content" {
  default = "I love green color!"
}
```

Once your variables are declared in the variables.tf file, update your main.tf file to reference these variables. You achieve this by prefixing the variable name just like the example below.

```hcl
# main.tf
resource "local_file" "colors" {
  filename = var.filename
  content  = var.content
}
```

**Updating Values**

To make changes, you just update the variable values instead of modifying the main code. then just run `terraform plan` & `terraform apply`. Terraform will update the resource accordingly.

### Variables in Terraform

In Terraform, you can assign values to variables in different ways. If the same variable is defined in multiple places, Terraform follows a `priority order` to decide which value to use.

For example, a variable can be set like this:

**1] Environment Variable**
```bash
export TF_VAR_filename="/root/color1.txt"
```

**2] terraform.tfvars file**
```bash
filename = "/root/color2.txt"
```

**3] .auto.tfvars file**
```bash
filename = "/root/color3.txt"
```

**4] Command Line (Highest Priority)**
```bash
terraform apply -var "filename=/root/color4.txt"
```

Terraform will choose the value based on priority, where **command-line input** overrides all other options.

### Output Variables

Terraform output variables save the results from your configuration files for future reference, making resource management and integration with external tools much more efficient.

Output variables are one of Terraform's most useful features — they let you store the results of expressions defined in your configuration and access them whenever needed. In earlier sections, we explored input variables and reference expressions; output variables build on those concepts by giving you a way to retrieve and display key information once your infrastructure is up and running.

**Capturing Resource Attributes**

Let's say you have a configuration that generates a random color name using Terraform's resource definitions. In this example, a resource called `random_string` generates a `color name`, and an output variable called color-name captures the generated id. This comes in handy when you need to pass data to other tools or quickly verify a resource after provisioning.

Here's what that configuration looks like:

```hcl
resource "local_file" "color" {
  filename = var.filename
  content  = "My favorite color is ${random_string.my-color.id}"
}

resource "random_string" "my-color" {
  prefix    = var.prefix
  separator = var.separator
  length    = var.length
}

output "color-name" {
  value = random_string.my-color.id
  description = ""
}
```

The output block begins with the keyword `output`, followed by the variable name. Within the block, the `value` argument is mandatory and uses a reference expression `(random_string.my-color.id)`. The `description` argument is optional, but it's a good habit to include a short explanation of what the output represents.

**Tip:** Always write meaningful descriptions for your output variables. It improves code readability and makes collaboration with your team much smoother.

**Declaring the Supporting Variables**

To make the above resources work correctly, you'll need the following variable declarations in your configuration:

```hcl
variable "filename" {
  default = "/root/colors.txt"
}

variable "content" {
  default = "I love colors!"
}

variable "prefix" {
  default = "Mrs"
}

variable "separator" {
  default = "."
}

variable "length" {
  default = "1"
}
```

These definitions provide the required default values and keep the configuration running without any issues during execution.

**Viewing Outputs in Terraform**

Once you run `terraform apply`, Terraform will automatically print the output variables on the screen after the resources are created. For example:

```hcl
$ terraform apply
...
Outputs:
  color-name = Mrs.blue
```

You can also check the value of any output variable at any point using the `terraform output` command. Running it without arguments will list all available outputs:

```hcl
$ terraform output
color-name = Mrs.blue
```

To view a specific output variable, just pass its name as an argument:
```hcl
$ terraform output color-name
Mrs.blue
```

Output variables are extremely helpful for quickly reviewing details about your provisioned resources and for connecting Terraform with other infrastructure-as-code tools, standalone scripts, or configuration management platforms like Ansible. For more comprehensive information on Terraform output variables and other configuration concepts, please refer to [official documentation](https://developer.hashicorp.com/terraform/docs) of terraform.

## Understanding Terraform State

### What is Terraform State?

This article covers how Terraform manages state, tracks infrastructure changes, and uses the state file as its source of truth.

Building on the basics — writing HCL configurations, declaring variables, and linking resources — we now look at how Terraform keeps track of real-world infrastructure behind the scenes.

**Project Structure Overview**

Assume you have a project directory called `terraform-local-file` with two files:
```bash
$ ls terraform-local-file
main.tf  variables.tf
```

`main.tf:`
```hcl
resource "local_file" "color" {
  filename = var.filename
  content  = var.content
}
```

`variables.tf:`
```hcl
variable "filename" {
  default = "/root/colors.txt"
}

variable "content" {
  default = "I love colors!"
}
```

No resources have been created yet at this point.

**Initialize and Plan**

Start by running `terraform init` to download the required plugins. Then run `terraform plan` to preview what Terraform intends to do:

```hcl
$ terraform plan

  # local_file.color will be created
  + resource "local_file" "color" {
      + content              = "I love colors!"
      + directory_permission = "0777"
      + file_permission      = "0777"
      + filename             = "/root/colors.txt"
      + id                   = (known after apply)
    }

Plan: 1 to add, 0 to change, 0 to destroy.
```

Since no state file exists yet, Terraform knows all resources need to be freshly created.

**Applying the Configuration**

Run `terraform apply` and confirm with `yes` to provision the resource:

```hcl
local_file.color: Creating...
local_file.color: Creation complete after 0s
[id=7e4db4fbfddb108bdd046926202bae3e9bd1e168]
```

Terraform creates `/root/colors.txt` with the content `"I love colors!"`. If you run `terraform apply` again, Terraform detects the resource already exists and makes no changes:

```hcl
Apply complete! Resources: 0 added, 0 changed, 0 destroyed.
```

This is possible because Terraform maintains a state file that tracks what's already been provisioned.

**The Terraform State File**

After the first successful apply, a new file `terraform.tfstate` appears in your directory:

```bash
$ ls
main.tf  variables.tf  terraform.tfstate
```

This JSON file maps your real-world infrastructure to your configuration. Here's what it looks like:

```hcl
{
  "version": 4,
  "terraform_version": "0.13.0",
  "resources": [
    {
      "type": "local_file",
      "name": "color",
      "instances": [
        {
          "attributes": {
            "content": "I love colors!",
            "filename": "/root/colors.txt",
            "id": "7e4db4fbfdcb108dd04692062bae39bd1e1b68"
          }
        }
      ]
    }
  ]
}
```

**Note:** The `terraform.tfstate` file is Terraform's **single source of truth**. It is referenced on every `plan` and `apply` to determine whether any changes are needed.

**Updating the Configuration**

Now change the content value in `variables.tf:`
```hcl
variable "content" {
  default = "We love colors!"
}
```

Running `terraform apply` again causes Terraform to detect a difference between the current state and the new configuration, and replace the resource:
```hcl
# local_file.color must be replaced
-/+ resource "local_file" "color" {
      filename = "/root/colors.txt"
  ~   id       = "old-id" -> "new-id"
      # "We love colors!" forces replacement due to content change
    }
```

Terraform removes the old resource and creates a new one with an updated ID. The state file is then updated to reflect this new state. From this point, running `terraform apply` again will confirm no further changes are needed.

### Purpose of the State File

For solo projects, keeping the `terraform.tfstate` file locally is perfectly fine. But in a **team environment**, everyone needs access to the same up-to-date state file — otherwise you risk inconsistencies and hard-to-debug errors.

This is where a **remote backend** comes in. Services like **AWS S3**, **Terraform Cloud**, or **HashiCorp Console** store the state file in a central location, ensuring every team member is always working with the latest version.

A typical project directory looks like this:
```bash
$ ls
main.tf  variables.tf  terraform.tfstate
```

Storing state remotely eliminates discrepancies and makes team collaboration much smoother.

Here's an example of what a state file looks like:

```hcl
{
  "version": 4,
  "terraform_version": "0.13.0",
  "serial": 4,
  "lineage": "e35dde72-a943-de50-3c8b-1df8986e5a31",
  "outputs": {},
  "resources": [
    {
      "mode": "managed",
      "type": "local_file",
      "name": "color",
      "instances": [
        {
          "schema_version": 0,
          "attributes": {
            "content": "We love colors!",
            "content_base64": null,
            "directory_permission": "0777"
          }
        }
      ]
    }
  ]
}
```

**Best Practice:** Always use a remote backend when working in a team. It prevents state conflicts and ensures everyone is on the same page.

### Best Practices and Considerations

Terraform state is the single source of truth that keeps Terraform in sync with your deployed infrastructure. Here are some key things to keep in mind when managing it.

**Sensitive Information in the State File**

State files hold a lot of detailed information about your infrastructure — and some of it is sensitive. For example, an AWS EC2 instance state file can contain CPU and memory specs, OS image details, disk configuration, network info like IP addresses, and even SSH key pairs. Database resources may also expose initial passwords.

When stored locally, all of this is saved as **plain text JSON** — which makes securing these files absolutely essential.

Here's an example snippet from an EC2 instance state file:
```hcl
{
  "mode": "managed",
  "type": "aws_instance",
  "name": "prod-ec2",
  "instances": [
    {
      "attributes": {
        "ami": "ami-0b72821e2f351e396",
        "private_ip": "10.0.1.45",
        "public_ip": "18.234.56.102",
        "public_dns": "ec2-18-234-56-102.us-east-1.compute.amazonaws.com"
      },
      "root_block_device": [
        {
          "device_name": "/dev/xvda",
          "encrypted": false,
          "volume_id": "vol-0a1b2c3d4e5f67890"
        }
      ]
    }
  ]
}
```

**Configuration File Vs State File**

Your working directory typically has two types of files:

| File Type                 | Description                                                  | Where to Sotre                 |
| ------------------------- | ------------------------------------------------------------ | ------------------------------ |
| Configuration Files (HCL) | Infrastructure code in HCL that defines your resources       | Version control systems like GitHub, GitLab, Bitbucket   |
| State File (JSON)         | Records the current state of deployed infrastructure in Json | Secure remote backends like AWS S3, Terraform Cloud         |

Configuration files are safe to commit to version control. The state file, however, contains sensitive data and should never be pushed to a Git repository. Always use a secure remote backend instead.

**Never Manually Edit the State File**

The state file is intended for **Terraform's internal use only**. Editing it by hand is strongly discouraged as it can lead to state corruption.

If you need to make changes, use Terraform's built-in commands instead:

- `terraform state mv` — to move or rename a resource in state
- `terraform state rm` — to remove a resource from state

These commands modify state safely while keeping everything consistent with your actual infrastructure.

## Working with Terraform 

### Common Terraform Commands

Once you start working with Terraform, there are a handful of commands you'll use regularly. Here's a quick rundown of the most important ones.

`terraform validate`

This command checks your configuration files for any syntax errors — without actually creating or changing any infrastructure. It's a quick way to catch typos or mistakes before running a full plan.

If everything looks good, you'll see:
```hcl
Success! The configuration is valid.
```

If there's an error, Terraform will tell you exactly which line is the problem and often suggest a fix.

`terraform fmt`

This command automatically formats your configuration files to follow Terraform's standard style. It's great for keeping your code clean and consistent, especially when working in a team.

`terraform show`

Use this command to view the **current state** of your infrastructure — all the attributes and details of your managed resources. You can also add the `-json` flag to get the output in JSON format, which is useful for scripting or automation.

`terraform providers`

This command lists all the **providers** your configuration needs, as well as those currently recorded in the state file. You can also use it to mirror provider plugins to a local directory — handy when working in environments with limited internet access.

`terraform output`

Once your infrastructure is applied, this command displays all your **output variables** in one place. For example:
```hcl
$ terraform output
color-name = dark-blue
content    = We love colors!
```

It's a quick way to check key values without digging through the state file.

`terraform refresh / terraform apply -refresh-only`

Sometimes changes happen to your infrastructure **outside of Terraform** — manually in the console, for example. The refresh command syncs your state file with the actual current state of your infrastructure, without making any changes.

**Note:** In newer versions of Terraform, it's recommended to use `terraform apply -refresh-only` instead of the standalone terraform refresh command.

`terraform graph`

This command generates a **visual map of resource dependencies** — showing how your resources are connected to each other. The output is in DOT format, which you can convert into an image using a tool called **Graphviz:**
```bash
$ terraform graph | dot -Tsvg > graph.svg
```

Open the resulting `graph.svg` in your browser to see a clear picture of how your resources relate to one another.

### Lifecycle Rules in Terraform

By default, when Terraform updates a resource, it **deletes the old one first and then creates a new one**. This works fine in many cases, but sometimes you need more control — for example, when you can't afford downtime or want to protect critical resources from accidental deletion.

That's where **lifecycle rules** come in. You can add them inside any resource block to change this default behavior.

**create_before_destroy**

This rule tells Terraform to `create the new resource` first before removing the old one — ensuring there's no gap in availability during updates.

```hcl
resource "local_file" "color" {
  filename        = "/root/colors.txt"
  content         = "We love colors!"
  file_permission = "0700"

  lifecycle {
    create_before_destroy = true
  }
}
```

```hcl
local_file.color: Creating...
local_file.color: Creation complete after 0s
local_file.color: Destroying...
local_file.color: Destruction complete after 0s

Apply complete! Resources: 1 added, 0 changed, 1 destroyed.
```

**prevent_destroy**

This rule `blocks Terraform from destroying a resource` if a configuration change would normally force a replacement. It's useful for protecting critical resources like databases from accidental deletion.

```hcl
resource "local_file" "color" {
  filename        = "/root/colors.txt"
  content         = "We love colors!"
  file_permission = "0700"

  lifecycle {
    prevent_destroy = true
  }
}
```

If Terraform's plan includes destroying the resource, it will throw an error:

```hcl
Error: Instance cannot be destroyed

Resource local_file.color has lifecycle.prevent_destroy set,
but the plan calls for this resource to be destroyed.
```

**Note:** This rule only prevents destruction caused by configuration changes. Running `terraform destroy` explicitly will still remove the resource.

**ignore_changes**

Sometimes resources get updated **outside of Terraform** — for example, someone manually changes a tag on an AWS EC2 instance. By default, Terraform would detect this and try to revert it. The `ignore_changes` rule tells Terraform to leave those attributes alone.

```hcl
resource "aws_instance" "appserver" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.small"
  tags = {
    Name = "DevTeam-AppServer"
  }

  lifecycle {
    ignore_changes = [
      tags
    ]
  }
}
```

To ignore changes across **all attributes**, use the `all` keyword:

```hcl
lifecycle {
    ignore_changes = all
  }
```

After this, Terraform will refresh the state without making any unwanted changes:

```hcl
Apply complete! Resources: 0 added, 0 changed, 0 destroyed.
```

These three lifecycle rules give you fine-grained control over how Terraform manages your resources — helping you avoid downtime, prevent accidental deletions, and peacefully coexist with external changes to your infrastructure.

### Data Sources

Data sources allow Terraform to read information from resources it doesn't manage — such as resources created manually, by other tools like Ansible or CloudFormation, or by a separate Terraform configuration — and use that data when provisioning its own resources. They are defined using a data block instead of a resource block.

Example: Say an external script created `/root/blue.txt` containing `"Blue is awesome!"`. We can use it as a data source to populate our Terraform-managed file:

```hcl
resource "local_file" "color" {
  filename = "/root/colors.txt"
  content  = data.local_file.blue.content
}

data "local_file" "blue" {
  filename = "/root/blue.txt"
}
```

Here the data block reads `/root/blue.txt` and its content becomes available via `data.local_file.blue.content`, which is then used to populate the managed resource.

### Using count

The count meta-argument lets you create multiple instances of a resource without repeating the same block over and over.

**Static Count**

The simplest way — just set a number:

```hcl
resource "local_file" "color" {
  filename = var.filename
  count    = 3
}
```

This creates three resources: `color[0]`, `color[1]`, `color[2]`. But since they all share the same filename, Terraform just creates the same file three times — not very useful.

**Using a List for Unique Resources**

To create unique files, switch to a list variable and use `count.index` to pick each element:

```hcl
resource "local_file" "color" {
  filename = var.filename[count.index]
  count    = 3
}

variable "filename" {
  default = [
    "/root/blue.txt",
    "/root/red.txt",
    "/root/green.txt"
  ]
}
```

Now each resource gets a unique filename.

**Dynamic Count with length()**

Hardcoding `count = 3` means you have to remember to update it every time you add items to the list. Use `length()` instead to handle this automatically:

```hcl
resource "local_file" "color" {
  filename = var.filename[count.index]
  count    = length(var.filename)
}
```
Now Terraform will always create exactly as many resources as there are items in the list — no manual updates needed.

**Watch Out: Index Shifting Pitfall**

Here's a common gotcha. If you remove an element from the **middle or beginning** of the list, all the indices after it shift — causing Terraform to replace or destroy resources you didn't intend to touch.

For example, if you remove `/root/blue.txt` from the list:
- `color[0]` gets replaced (was blue, now red)
- `color[1]` gets replaced (was red, now green)
- `color[2]` gets destroyed (no longer exists)

```bash
# local_file.color[0] must be replaced
# local_file.color[1] must be replaced
# local_file.color[2] will be destroyed
```

### Using for_each

As we saw in the previous section, `count` can cause unexpected replacements when list order changes. `for_each` solves this by giving each resource a **unique** key instead of an index number.

**Important:** `for_each` Needs a Map or Set, `for_each` does not work directly with a list. Passing a list will throw this error:

```bash
Error: Invalid for_each argument
The "for_each" argument must be a map, or set of strings,
and you have provided a value of type list of string.
```
Fix this by wrapping your list with the built-in `toset()` function:

```hcl
resource "local_file" "color" {
  filename = each.value
  for_each = toset(var.filename)
}

variable "filename" {
  type = list(string)
  default = [
    "/root/blue.txt",
    "/root/red.txt",
    "/root/green.txt"
  ]
}
```
Now Terraform creates resources keyed by filename instead of index:

```bash
# local_file.color["/root/blue.txt"] will be created
# local_file.color["/root/red.txt"] will be created
# local_file.color["/root/green.txt"] will be created

Plan: 3 to add, 0 to change, 0 to destroy.
```

**Removing an Element — No Index Shifting!**

If you remove `/root/blue.txt` from the list and run `terraform plan`, only that specific resource is destroyed — the others are completely untouched:
```hcl
# local_file.color["/root/blue.txt"] will be destroyed

Plan: 0 to add, 0 to change, 1 to destroy.
```
This is the key advantage of `for_each` over count. Use `count` for simple, identical resources. Use `for_each` when each resource is unique and you want safer updates and deletions.

## Terraform with AWS (Hands-on)

### AWS IAM using Terraform

In this section, we'll walk through how to provision AWS IAM resources using Terraform. Instead of using the AWS Management Console or CLI manually, we'll let Terraform handle it by making the process faster, repeatable, and easier to manage.

#### Creating an IAM User Resource

Terraform follows a naming convention where the resource type is prefixed with the provider name. Below we define an IAM user resource block named `"dev-user"`. The only mandatory argument is `name` — the actual IAM username. You can also attach optional arguments like `tags`.

```hcl
resource "aws_iam_user" "dev-user" {
  name = "Sarah"
  tags = {
    Description = "Senior Cloud Engineer"
  }
}
```
**Initializing and Planning**

Before applying anything, run `terraform init` to pull down the AWS provider plugin:
```bash
terraform init
```
Then run `terraform plan` to preview the changes. At this point you might run into two common issues:

- Terraform asks for an **AWS region** — even for IAM (which is global), because most AWS resources are region-specific.
- Terraform can't find valid **AWS credentials** to connect to your account.

Both issues are fixed by adding a provider block.

#### Configuring the AWS Provider

Add a provider block to your configuration specifying the region and credentials:
```hcl
provider "aws" {
  region     = "us-east-1"
  access_key = "AKIAI44QH8DHBEXAMPLE"
  secret_key = "je7MtGbClwBF/2tk/h3yCo8n..."
}

resource "aws_iam_user" "dev-user" {
  name = "Sarah"
  tags = {
    Description = "Senior Cloud Engineer"
  }
}
```
With the region set to `us-east-1` and credentials provided, Terraform can now authenticate and interact with your AWS account.

**Running Plan and Apply**

With the provider configured, run `terraform plan` again, Once you've reviewed the plan and everything looks correct, apply it:
```bash
terraform apply
```
Terraform will go ahead and create the IAM user as defined in your configuration.

#### Best Practices: Never Hardcode Credentials

Hardcoding your AWS credentials directly in Terraform files is a bad practice — especially if those files end up in a version control system like GitHub. Anyone with access to the repo can see your keys.

Instead, use one of these two safer approaches:

**Option 1 — AWS CLI Configuration**

Run the following command to store credentials locally on your machine:
```bash
aws configure
```
This saves your credentials in `~/.aws/credentials`:
```bash
[default]
aws_access_key_id = YOUR_ACCESS_KEY_ID
aws_secret_access_key = YOUR_SECRET_ACCESS_KEY
```
Terraform automatically picks these up — no need to mention them in your config files at all.

**Option 2 — Environment Variables**

You can also export your credentials as environment variables in your terminal session:
```bash
export AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY=YOUR_SECRET_ACCESS_KEY
export AWS_DEFAULT_REGION=us-east-1
```

Both approaches keep sensitive information out of your Terraform files, making your setup significantly more secure.

By following these steps, you can provision and manage AWS IAM resources through Terraform in a clean, secure, and maintainable way. For more details, refer to the [Terraform AWS Provider Documentation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs).

### Creating IAM Policies

In this section, we'll walk through how to create an IAM policy using Terraform and attach it to an AWS user. We'll use the example of a user named **Sarah**, who starts with zero permissions. Following the **principle of least privilege**, we'll grant only the permissions she actually needs.

AWS defines permissions using **JSON-formatted policy documents**. Here's an example of an administrator access policy:
```bash
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "*",
      "Resource": "*"
    }
  ]
}
```

**Step 1: Define the IAM User and Policy in Terraform**

We use the `aws_iam_policy` resource to create the policy. The only required argument is the policy document in JSON format. Here's the initial setup:
```hcl
resource "aws_iam_user" "dev-user" {
  name = "sarah"
  tags = {
    Description = "Senior Cloud Engineer"
  }
}

resource "aws_iam_policy" "devUserPolicy" {
  name   = "DevUserAccess"
  policy = ?
}
```
**Step 2: Embed the Policy Using Heredoc Syntax**

Instead of referencing an external file, you can embed the JSON policy document directly in your Terraform config using **heredoc syntax** (`<<EOF`). This keeps everything in one place:
```hcl
resource "aws_iam_user" "dev-user" {
  name = "sarah"
  tags = {
    Description = "Senior Cloud Engineer"
  }
}

resource "aws_iam_policy" "devUserPolicy" {
  name   = "DevUserAccess"
  policy = <<EOF
{
  "Version": "2026-04-10",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "*",
      "Resource": "*"
    }
  ]
}
EOF
}
```
**Step 3: Attach the Policy to the User**

Simply defining a policy doesn't grant it to anyone. You need to explicitly attach it using the `aws_iam_user_policy_attachment` resource, which takes the **username** and the **policy ARN** as inputs:
```hcl
resource "aws_iam_user_policy_attachment" "sarah-dev-access" {
  user       = aws_iam_user.dev-user.name
  policy_arn = aws_iam_policy.devUserPolicy.arn
}
```
**Complete Configuration**

Putting it all together:
```hcl
resource "aws_iam_user" "dev-user" {
  name = "sarah"
  tags = {
    Description = "Senior Cloud Engineer"
  }
}

resource "aws_iam_policy" "devUserPolicy" {
  name   = "DevUserAccess"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "*",
      "Resource": "*"
    }
  ]
}
EOF
}

resource "aws_iam_user_policy_attachment" "sarah-dev-access" {
  user       = aws_iam_user.dev-user.name
  policy_arn = aws_iam_policy.devUserPolicy.arn
}
```
**Alternative: Use an External JSON File**

If you prefer keeping your policy document separate from your Terraform code — which can improve readability — store it in an external file instead.

1. Create a file called `dev-policy.json` in the same directory as `main.tf`
2. Move the JSON policy content into that file
3. Update the resource to read from it using the `file()` function:
```hcl
resource "aws_iam_policy" "devUserPolicy" {
  name   = "DevUserAccess"
  policy = file("dev-policy.json")
}
```
Everything else in the configuration stays the same. This approach is especially useful when your policy documents are large or shared across multiple configurations.

### Working with S3 Buckets

In this section, we'll go through how to create and manage an S3 bucket using Terraform. Specifically, we'll cover three things:

- Creating an S3 bucket
- Uploading a file to that bucket
- Attaching a bucket policy to grant access to an IAM entity

#### Creating an S3 Bucket

We use the `aws_s3_bucket` resource to set up a bucket. Each bucket name must be globally unique across AWS. Here's an example:
```hcl
resource "aws_s3_bucket" "hr_data" {
  bucket = "hr-data-14102023"
  tags = {
    Description = "HR Records and Payroll Data"
  }
}
```

#### Uploading a File to the Bucket

Once the bucket is ready, we can upload a file using the `aws_s3_bucket_object` resource. The three key arguments needed are the **bucket reference**, the **key** (filename in the bucket), and the **content**.
```hcl
resource "aws_s3_bucket_object" "hr-report-2023" {
  content = "/root/hr/hr-report-2023.doc"
  key     = "hr-report-2023.doc"
  bucket  = aws_s3_bucket.hr_data.id
}
```
**Tip:** If you want to upload the actual contents of a file rather than just its path as a string, use the `file()` function:
```bash
content = file("/root/hr/hr-report-2023.doc")
```
#### Attaching a Bucket Policy

To grant access to members of an IAM group called `"hr-team"`, we need to attach a bucket policy. However, there's an important limitation to be aware of:

**Note:** IAM groups cannot be used directly as principals in S3 bucket policies. You must reference individual IAM users or roles instead.

To work around this, we first fetch the IAM group details using a data source:
```hcl
data "aws_iam_group" "hr-group-data" {
  group_name = "hr-team"
}
```
Then we attach a bucket policy that dynamically references both the bucket and the IAM group user’s using Terraform interpolation:
```hcl
resource "aws_s3_bucket_policy" "hr-bucket-policy" {
  bucket = aws_s3_bucket.hr_data.id
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "*",
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::${aws_s3_bucket.hr_data.id}/*",
      "Principal": {
        "AWS": ${jsonencode(data.aws_iam_group.hr-group-data.users[*].arn)}
      }
    }
  ]
}
EOF
}
```
Once you run `terraform apply`, the policy is attached and the specified IAM entity gets full access to the bucket.

### DynamoDB with Terraform

In this section, we'll walk through how to create a DynamoDB table using Terraform and insert data into it. We'll use the example of a table that stores information about electronic devices.

#### Creating the DynamoDB Table

We use the `aws_dynamodb_table` resource to set up a DynamoDB table. In this example, we create a table called `"devices"` that holds data about electronics. Every DynamoDB table needs a **name**, a **hash key** (primary key), and an **attribute block** describing that key.

Here we're using the device's serial number (`SerialNo`) as the primary key, with billing set to on-demand (`PAY_PER_REQUEST`):
```hcl
resource "aws_dynamodb_table" "devices" {
  name         = "devices"
  hash_key     = "SerialNo"
  billing_mode = "PAY_PER_REQUEST"
  attribute {
    name = "SerialNo"
    type = "S"
  }
}
```
**Note:** On-demand billing (`PAY_PER_REQUEST`) is ideal for workloads with unpredictable traffic, you only pay for what you use. If you switch to provisioned capacity (the default mode), you'd also need to declare read and write capacity units.

Run `terraform apply` to create the table.

#### Inserting Items into the Table

Once the table is ready, we can add data to it using the `aws_dynamodb_table_item` resource. This resource needs the **table name**, the **hash key**, and the **item data** in JSON format.

We use heredoc syntax (`<<EOF`) to define the item. Note that each attribute value must include its type — `"S"` for string and `"N"` for number:
```hcl
resource "aws_dynamodb_table" "devices" {
  name         = "devices"
  hash_key     = "SerialNo"
  billing_mode = "PAY_PER_REQUEST"
  attribute {
    name = "SerialNo"
    type = "S"
  }
}

resource "aws_dynamodb_table_item" "device-items" {
  table_name = aws_dynamodb_table.devices.name
  hash_key   = aws_dynamodb_table.devices.hash_key
  item       = <<EOF
{
  "Manufacturer": {"S": "Samsung"},
  "Model":        {"S": "Galaxy Tab S8"},
  "Year":         {"N": "2022"},
  "SerialNo":     {"S": "SN-8X92KLM3047"}
}
EOF
}
```
Run `terraform apply` to insert the item.

**Remember:** This approach works well for managing a small number of items. For bulk data insertion or large-scale operations, consider using dedicated data migration tools or strategies instead of Terraform resources.

## Remote State Management

### What is a Remote State & State Locking

When you first run `terraform apply`, Terraform creates a local `terraform.tfstate` file that maps your configuration to real-world infrastructure. This state file serves several purposes like tracking resource dependencies, managing deletion order, improving performance across large configurations, and giving your team a single view of infrastructure.

**Problems with Local State**

While local state works fine for solo projects, it becomes a problem in team environments:

- Sensitive data (IP addresses, passwords, key names) sits on someone's local machine
- Storing the state file in Git exposes that sensitive data to anyone with repo access
- Two people applying changes at the same time can corrupt the state file

A typical scenario: **Raj** sets up an S3 bucket config, applies it, and pushes everything including `terraform.tfstate` to GitHub. **Maya** pulls it, makes changes, applies, and pushes back. This seems fine — but it's risky. If both work simultaneously, or if either forgets to pull first, the state can get corrupted or resources can be accidentally destroyed.

**How State Locking Works**

To prevent simultaneous modifications, Terraform locks the state file during any apply or plan operation. If someone else tries to run Terraform at the same time, they'll see:
```bash
Error: Error locking state: Error acquiring the state lock
Lock Info:
  ID:        dfere3806-007c-084b-be61-cef4cdc77dee
  Path:      terraform.tfstate
  Operation: OperationTypeApply
  Who:       root@iac-server
```
However, state locking only works properly with remote backends — Git repositories don't support it at all.

**Remote Backends: The Right Solution**

Instead of storing state locally or in Git, use a remote backend — a secure, shared storage service like:

- AWS S3
- Google Cloud Storage
- HashiCorp Consul
- Terraform Cloud

With a remote backend, Terraform automatically:

- Pulls the latest state before every operation
- Pushes updated state after every terraform apply
- Enforces state locking to prevent conflicts
- Encrypts state at rest and in transit for security

This ensures your entire team always works with the same up-to-date state, without any of the risks that come with local or Git-based state management.

### Using Remote Backends with S3

In this section, we'll walk through how to set up a remote backend in Terraform using an `AWS S3 bucket` for state storage and a `DynamoDB table` for state locking. This setup centralizes your state file and makes team collaboration much safer and more reliable.

**Before you start, make sure you have:**

1. An S3 bucket already created to hold your Terraform state file
2. A DynamoDB table set up with a primary (hash) key named `"lockid"` for state locking

Keep the following details handy as you'll need them in the configuration:

- S3 bucket name
- S3 key (the path where the state file will be stored inside the bucket)
- AWS region where the bucket is hosted
- DynamoDB table name

**Adding the Backend Configuration**

Go to your configuration directory. You might already have a `main.tf` file defining your resources. By default, running `terraform apply` creates a local `terraform.tfstate` file. To move this to a remote backend, you need to add a terraform block with backend settings.

Here's an updated configuration that includes both the resource and the backend block:
```hcl
resource "local_file" "color" {
  filename = "/root/colors.txt"
  content  = "We love colors!"
}

terraform {
  backend "s3" {
    bucket         = "myproject-terraform-state-bucket"
    key            = "infrastructure/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-state-lock"
  }
}
```
**Here's what each argument does:**

- **bucket** — the name of your S3 bucket where the state file will live
- **key** — the path within the bucket for storing the state file (here, inside a folder called `"infrastructure"`)
- **region** — the AWS region where your S3 bucket is hosted
- **dynamodb_table** — the name of your pre-created DynamoDB table that handles state locking, preventing two people from modifying state at the same time.

**Tip:** It's a good practice to keep your backend configuration separate from your infrastructure code. Consider moving the terraform block into its own file — for example, `terraform.tf` — while keeping resource definitions in `main.tf`. This keeps things cleaner and easier to maintain.

**Initializing the New Backend**

Once your configuration files are organized, run `terraform init` to initialize the remote backend. Terraform will detect that a local state file already exists and ask if you'd like to migrate it to the new S3 backend:
```bash
$ terraform init
Initializing the backend...
Do you want to copy existing state to the new backend?
  Pre-existing state was found while migrating the previous "local" backend to the newly configured "s3" backend. No existing state was found in the newly configured "s3" backend. Do you want to copy this state to the new "s3" backend? Enter "yes" to copy and "no" to start with an empty state.

Enter a value: yes

Successfully configured the backend "s3"! Terraform will automatically
use this backend unless the backend configuration changes.
```
Type `yes` to migrate your existing local state to S3. Once the migration is complete, you can safely delete the local state file since Terraform will now read and write state exclusively from the remote backend:
```bash
$ rm -rf terraform.tfstate
```
**Running Operations with the Remote Backend**

From this point on, every Terraform operation will interact with the remote state. When you run `terraform plan` or `terraform apply`, Terraform will:

1. Acquire a state lock via DynamoDB
2. Fetch the latest state from the S3 bucket
3. Perform the planned operations
4. Release the state lock once done

With this setup in place, your Terraform state is now stored securely in S3, protected by DynamoDB-based locking, and accessible to your entire team by making collaborative infrastructure management significantly more reliable and safe.

## Terraform Provisioners

### Introduction to Provisioners

Provisioners let you execute scripts or commands either on a remote resource or on your local machine right after a resource is created or just before it's destroyed.

`remote-exec` — **Run Commands on Remote Resource**

This provisioner SSH into your instance and runs commands directly on it. The example below installs and starts NGINX after an EC2 instance is deployed:
```hcl
resource "aws_instance" "appserver" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.small"

  provisioner "remote-exec" {
    inline = [
      "sudo apt update",
      "sudo apt install nginx -y",
      "sudo systemctl enable nginx",
      "sudo systemctl start nginx",
    ]
  }

  connection {
    type        = "ssh"
    host        = self.public_ip
    user        = "ubuntu"
    private_key = file("/root/.ssh/appserver")
  }

  key_name               = aws_key_pair.app.id
  vpc_security_group_ids = [aws_security_group.ssh-access.id]
}
```
Make sure SSH access, security groups, and a valid key pair are all configured before using `remote-exec`. The **connection block** tells Terraform how to reach the instance using `self.public_ip` to dynamically grab the instance's public IP after creation.

`local-exec` — **Run Commands on Your Local Machine**

This provisioner runs commands on the machine where Terraform is executed, not on the remote resource. Useful for logging or triggering local scripts:
```hcl
resource "aws_instance" "appserver" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.small"

  provisioner "local-exec" {
    command = "echo ${aws_instance.appserver.public_ip} >>   /tmp/server_ips.txt"
  }
}
```
**Create-Time and Destroy-Time Provisioners**

By default, provisioners run after a resource is created. To run one before destruction, use the `when = destroy` argument:
```hcl
provisioner "local-exec" {
  command = "echo Instance ${aws_instance.appserver.public_ip} Created! > /tmp/server_state.txt"
}

provisioner "local-exec" {
  when    = destroy
  command = "echo Instance ${aws_instance.appserver.public_ip} Destroyed! > /tmp/server_state.txt"
}
```
**Handling Failures**

If a provisioner command fails, the entire `terraform apply` errors out by default. For example, a wrong file path like `/temp/` instead of `/tmp/` will cause:
```hcl
Error: Error running command: exit status 1.
Output: The system cannot find the path specified.
```
To control this behavior, use the `on_failure` argument:
```hcl
provisioner "local-exec" {
  on_failure = continue   # or "fail" to keep default behavior
  command    = "echo ${aws_instance.appserver.public_ip} > /temp/server_state.txt"
}
```
**Best Practice: Avoid Provisioners When Possible**

Provisioners should be used as a last resort. Whenever a native resource option exists, prefer that instead.
For example, instead of using `remote-exec` to install NGINX, use AWS EC2's built-in `user_data`:
```hcl
resource "aws_instance" "appserver" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.small"
  tags = {
    Name        = "appserver"
    Description = "NGINX Server on Ubuntu"
  }
  user_data = <<-EOF
    #!/bin/bash
    sudo apt update
    sudo apt install nginx -y
    sudo systemctl enable nginx
    sudo systemctl start nginx
  EOF
}
```
This is cleaner, more reliable, and doesn't depend on network connectivity at apply time. Similarly, Azure uses `custom_data` and GCP uses `metadata` for the same purpose.

## Terraform Modules

### What are Modules?

As your infrastructure grows, your Terraform configuration files get longer and more complex. You might end up with dozens of resources such as EC2 instances, IAM roles, S3 buckets, DynamoDB tables, all crammed into one directory, with lots of repeated code that's hard to maintain or share with teammates.

Splitting things into multiple `.tf` files helps a little, but the root problem remains like duplication, complexity, and risk of breaking things unintentionally.

**So What Exactly is a Module?**

Any directory containing `.tf` files is a module. You're already using one without knowing it. Every time you run Terraform from a directory, that directory is called the root module.

For example, say you have a directory called `aws-instance` that creates an EC2 instance:
```bash
$ ls /root/terraform-projects/aws-instance
main.tf  variables.tf
```

```hcl
# main.tf
resource "aws_instance" "appserver" {
  ami           = var.ami
  instance_type = var.instance_type
  key_name      = var.key
}
```

```hcl
# variables.tf
variable "ami" {
  type    = string
  default = "ami-0c55b159cbfafe1f0"
  description = "Ubuntu AMI ID in us-east-1 region"
}
```
When you run Terraform commands from within the aws-instance directory, it is considered the root module.

**Reusing a Module Across Environments**

Now say you want to spin up a similar EC2 instance for a development environment but without copy-pasting the same code. Here's how:

1] Create a new `development` directory:
```bash
$ mkdir /root/terraform-projects/development
```
2] Inside it, create a `main.tf` that simply references the existing module:
```hcl
module "dev-appserver" {
  source = "../aws-instance"
}
```
That's it! The `development` directory becomes your root module, and `aws-instance` becomes the child module it calls. The `source` argument tells Terraform where to find the child module and here it's a relative path pointing to the folder next to it.

### Creating and Using Custom Modules

Let's walk through a real-world example to understand how modules work in practice. Imagine a company called CloudBridge Solutions that has built an HR management application and needs to deploy it across multiple countries on AWS  using the same core infrastructure each time.

The architecture for each deployment includes:

- An EC2 instance (custom AMI) to host the application
- A DynamoDB table to store employee records
- An S3 bucket to store documents like payslips and tax forms

Instead of writing the same Terraform code repeatedly for each region, we'll package it into a reusable module.

**Setting Up the Module Directory**

Create a directory to house the module:
```bash
$ mkdir -p /root/terraform-projects/modules/hr-app
```
Inside `hr-app`, create four files, one for each resource and one for variables:

`app_server.tf` — EC2 instance configuration:
```hcl
resource "aws_instance" "app_server" {
  ami           = var.ami
  instance_type = "t2.medium"
  tags = {
    Name = "${var.app_region}-app-server"
  }
  depends_on = [
    aws_dynamodb_table.hr_db,
    aws_s3_bucket.hr_data
  ]
}
```
The `depends_on` block ensures the database and storage are ready before the app server starts.

`s3_bucket.tf` — S3 bucket for storing documents:
```hcl
resource "aws_s3_bucket" "hr_data" {
  bucket = "${var.app_region}-${var.bucket}"
}
```
The bucket name is automatically prefixed with the region name, keeping things unique per deployment.

`dynamodb_table.tf` — DynamoDB table for employee data:
```hcl
resource "aws_dynamodb_table" "hr_db" {
  name         = "employee_data"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "EmployeeID"

  attribute {
    name = "EmployeeID"
    type = "N"
  }
}
```
`variables.tf` — Variables to make the module flexible:
```hcl
variable "app_region" {
  type = string
}

variable "bucket" {
  default = "cloudbridge-hr-alpha-10293b"
}

variable "ami" {
  type = string
}
```
Some values like `instance_type` and the DynamoDB table name are hardcoded for consistency. Others like `ami` and `app_region` are kept as variables so each deployment can customize them.

**Deploying in the US East Region**

Create a separate root module directory for the US deployment:
```bash
$ mkdir -p /root/terraform-projects/us-hr-app
```
Inside it, create a `main.tf` that calls the module:
```hcl
module "us_hr" {
  source     = "../modules/hr-app"
  app_region = "us-east-1"
  ami        = "ami-24e140119877avm"
}
```
Run the usual commands to deploy:
```bash
$ terraform init
$ terraform plan
$ terraform apply
```
Terraform will create all three resources under the `us_hr` module:
```hcl
# module.us_hr.aws_dynamodb_table.hr_db will be created
# module.us_hr.aws_instance.app_server will be created
# module.us_hr.aws_s3_bucket.hr_data will be created
  bucket = "us-east-1-cloudbridge-hr-alpha-10293b"

Apply complete! Resources: 3 added, 0 changed, 0 destroyed.
```
**Deploying in the UK (London) Region**

For the UK deployment, create another root module directory:
```bash
$ mkdir -p /root/terraform-projects/uk-hr-app
```
```hcl
module "uk_hr" {
  source     = "../modules/hr-app"
  app_region = "eu-west-2"
  ami        = "ami-35e140119877avm"
}

provider "aws" {
  region = "eu-west-2"
}
```
Run `terraform apply` and Terraform deploys the exact same stack in London — with the S3 bucket automatically named for the UK region:
```hcl
# module.uk_hr.aws_s3_bucket.hr_data will be created
  bucket = "eu-west-2-cloudbridge-hr-alpha-10293b"

Apply complete! Resources: 3 added, 0 changed, 0 destroyed.
```
**How Module Resources are Referenced**

When using modules, each resource follows this naming pattern:
```bash
module.<module_name>.<resource_type>.<resource_name>
```
For example, the DynamoDB table in the US deployment is referenced as:
```bash
module.us_hr.aws_dynamodb_table.hr_db
```
This keeps all module resources neatly organized and easy to identify.

By packaging the infrastructure into a module, we wrote the configuration once and deployed it to multiple regions with just a few lines of code each time — no duplication, no inconsistency, and much less room for error.

## Conclusion

Terraform is one of the most powerful tools in a DevOps engineer's toolkit, and getting comfortable with it early can make a huge difference in how you manage infrastructure. In this blog, we covered everything from the basics of HCL and state management to real-world AWS deployments and reusable modules. 

Whether you're just starting out or looking to solidify your understanding, the concepts covered here give you a strong foundation to build on. Now it's time to get your hands dirty — spin up a project, write some configurations, and let Terraform do the heavy lifting!

