import { 
  SiAmazonwebservices, 
  SiKubernetes, 
  SiTerraform, 
  SiJavascript, 
  SiHtml5, 
  SiPostman
} from "react-icons/si";
import { FaLinux, FaJava } from "react-icons/fa";

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  icon: React.ElementType;
  color: string;
  category: "cloud" | "devops" | "development";
}

export const certifications: Certification[] = [
  {
    id: "terraform-basics",
    title: "Terraform Basics Training Course",
    issuer: "Kodekloud",
    date: "March 02, 2026",
    credentialUrl: "https://learn.kodekloud.com/user/certificate/d6712700-85e7-4fbd-9cf3-518769f10279",
    icon: SiTerraform,
    color: "#7B42BC",
    category: "devops",
  },
  {
    id: "aws-saa",
    title: "AWS Solutions Architect Associate",
    issuer: "Kodekloud",
    date: "February 18, 2026",
    credentialUrl: "https://learn.kodekloud.com/user/certificate/44f6cb8f-0663-44e2-b631-58fa0683c16c",
    icon: SiAmazonwebservices,
    color: "#FF9900",
    category: "cloud",
  },  
  {
    id: "rhcsa",
    title: "Red Hat Certified System Administrator (RHCSA)",
    issuer: "Kodekloud",
    date: "December 28, 2025",
    credentialUrl: "https://learn.kodekloud.com/user/certificate/27dc3a6c-9626-473b-95dc-e81c27e42e48",
    icon: FaLinux,
    color: "#EE0000",
    category: "devops",
  },
  {
    id: "cloud-fundamentals",
    title: "Cloud Computing Fundamentals",
    issuer: "Kodekloud",
    date: "December 04, 2025",
    credentialUrl: "https://learn.kodekloud.com/user/certificate/99767f6f-c50b-4037-ad40-365c854972fe",
    icon: SiAmazonwebservices,
    color: "#FF9900",
    category: "cloud",
  },
  {
    id: "postman-essentials",
    title: "Postman Essentials",
    issuer: "Kodekloud",
    date: "February 2026",
    credentialUrl: "https://learn.kodekloud.com/user/certificate/1d1dcc58-23ce-4740-8aa9-ff3d143113df",
    icon: SiPostman,
    color: "#FF6C37",
    category: "development",
  },
  {
    id: "k8s-autoscaling",
    title: "Kubernetes Autoscaling",
    issuer: "Kodekloud",
    date: "February 2026",
    credentialUrl: "https://learn.kodekloud.com/user/certificate/8609d09a-0c34-4884-8324-06b7a31cafa1",
    icon: SiKubernetes,
    color: "#326CE5",
    category: "devops",
  },
  {
    id: "javascript-complete",
    title: "The Complete JavaScript Course",
    issuer: "Udemy",
    date: "July 2022",
    credentialUrl: "https://www.udemy.com/certificate/UC-2fad1c8d-bb95-42ba-a1b7-f0ddd732cd48/",
    icon: SiJavascript,
    color: "#F7DF1E",
    category: "development",
  },
  {
    id: "html-css",
    title: "HTML & CSS Course",
    issuer: "Udemy",
    date: "July 2022",
    credentialUrl: "https://www.udemy.com/certificate/UC-c0b9d292-15f1-46c8-871c-e6b3bc076542/",
    icon: SiHtml5,
    color: "#E34F26",
    category: "development",
  },
  {
    id: "java-11",
    title: "Java 11 Essential Training",
    issuer: "LinkedIn Learning",
    date: "February 2024",
    credentialUrl: "https://www.linkedin.com/learning/certificates/356a3d78e885ec4f1e8b108c54b0170e2c6174ce1769167dc69d73580b9c304c",
    icon: FaJava,
    color: "#007396",
    category: "development",
  },
];

export const featuredCertifications = certifications.slice(0, 3);
