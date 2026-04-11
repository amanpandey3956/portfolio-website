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

