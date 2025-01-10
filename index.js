"use strict";
const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");
const awsx = require("@pulumi/awsx");
const eks = require("@pulumi/eks");


const vpc = new awsx.ec2.Vpc("vpc", {
    cidrBlock: "10.0.0.0/16"
});

const cluster = new eks.Cluster("cluster", {
    vpcId: vpc.id,
    subnetIds: vpc.publicSubnetIds,
    instanceType: "t3.micro"
});

exports.kubeconfig = cluster.kubeconfig;






// CMD Output
// There is an error.
// I added all the necessary policies to the IAM user but still some error. Have to debug.

// PS D:\Yashwanth\HTW_Berlin\Self_Learnings\Pulumi>
// PS D:\Yashwanth\HTW_Berlin\Self_Learnings\Pulumi> aws --version
// aws-cli/2.22.33 Python/3.12.6 Windows/11 exe/AMD64
// PS D:\Yashwanth\HTW_Berlin\Self_Learnings\Pulumi> echo $env:AWS_ACCESS_KEY_ID
// AKIASVLKCVVCBIBAEINR
// PS D:\Yashwanth\HTW_Berlin\Self_Learnings\Pulumi> pulumi up
// Previewing update (dev)

// View in Browser (Ctrl+O): https://app.pulumi.com/yashwanth/aws-project-1/dev/previews/fed0d343-aed7-47ee-92dd-ce9219391bd5

//      Type                                          Name                                  Plan
//  +   pulumi:pulumi:Stack                           aws-project-1-dev                     create...
//  +   ├─ awsx:ec2:Vpc                               vpc                                   create
//  +   │  └─ aws:ec2:Vpc                             vpc                                   create
//  +   │     ├─ aws:ec2:Subnet                       vpc-private-2                         create
//  +   │     │  └─ aws:ec2:RouteTable                vpc-private-2                         create
//  +   │     │     ├─ aws:ec2:RouteTableAssociation  vpc-private-2                         create
//  +   │     │     └─ aws:ec2:Route                  vpc-private-2                         create
//  +   │     ├─ aws:ec2:Subnet                       vpc-private-3                         create
//  +   │     │  └─ aws:ec2:RouteTable                vpc-private-3                              create
//  +   │     │     ├─ aws:ec2:RouteTableAssociation  vpc-private-3                              create
//  +   │     │     └─ aws:ec2:Route                  vpc-private-3                              create
//  +   │     ├─ aws:ec2:Subnet                       vpc-public-3                               create
//  +   │     │  ├─ aws:ec2:Eip                       vpc-3                                      create
//  +   pulumi:pulumi:Stack                           aws-project-1-dev                          create
//  +   │     │  │  ├─ aws:ec2:Route                  vpc-public-3                               create
//  +   │     │  │  └─ aws:ec2:RouteTableAssociation  vpc-public-3                               create
//  +   │     │  └─ aws:ec2:NatGateway                vpc-3                                      create
//  +   │     ├─ aws:ec2:Subnet                       vpc-public-1                               create
//  +   │     │  ├─ aws:ec2:Eip                       vpc-1                                      create
//  +   │     │  ├─ aws:ec2:RouteTable                vpc-public-1                               create
//  +   │     │  │  ├─ aws:ec2:Route                  vpc-public-1                               create
//  +   │     │  │  └─ aws:ec2:RouteTableAssociation  vpc-public-1                               create
//  +   │     │  └─ aws:ec2:NatGateway                vpc-1                                      create
//  +   │     ├─ aws:ec2:InternetGateway              vpc                                        create
//  +   │     ├─ aws:ec2:Subnet                       vpc-public-2                               create
//  +   │     │  ├─ aws:ec2:RouteTable                vpc-public-2                               create
//  +   │     │  │  ├─ aws:ec2:Route                  vpc-public-2                               create
//  +   │     │  │  └─ aws:ec2:RouteTableAssociation  vpc-public-2                               create
//  +   │     │  ├─ aws:ec2:Eip                       vpc-2                                      create
//  +   │     │  └─ aws:ec2:NatGateway                vpc-2                                      create
//  +   │     └─ aws:ec2:Subnet                       vpc-private-1                              create
//  +   │        └─ aws:ec2:RouteTable                vpc-private-1                              create
//  +   │           ├─ aws:ec2:RouteTableAssociation  vpc-private-1                              create
//  +   │           └─ aws:ec2:Route                  vpc-private-1                              create
//  +   └─ eks:index:Cluster                          cluster                                    create
//  +      ├─ eks:index:ServiceRole                   cluster-eksRole                            create
//  +      │  ├─ aws:iam:Role                         cluster-eksRole-role                       create
//  +      │  └─ aws:iam:RolePolicyAttachment         cluster-eksRole-4b490823                   create
//  +      ├─ eks:index:ServiceRole                   cluster-instanceRole                       create
//  +      │  ├─ aws:iam:Role                         cluster-instanceRole-role                  create
//  +      │  ├─ aws:iam:RolePolicyAttachment         cluster-instanceRole-03516f97              create
//  +      │  ├─ aws:iam:RolePolicyAttachment         cluster-instanceRole-3eb088f2              create
//  +      │  └─ aws:iam:RolePolicyAttachment         cluster-instanceRole-e1b295bd              create
//  +      ├─ aws:iam:InstanceProfile                 cluster-instanceProfile                    create
//  +      ├─ aws:ec2:SecurityGroup                   cluster-eksClusterSecurityGroup            create
//  +      ├─ aws:eks:Cluster                         cluster-eksCluster                         create
//  +      ├─ aws:ec2:SecurityGroupRule               cluster-eksClusterInternetEgressRule       create
//  +      ├─ pulumi:providers:kubernetes             cluster-eks-k8s                            create
//  +      ├─ aws:ec2:SecurityGroup                   cluster-nodeSecurityGroup                  create
//  +      ├─ aws:eks:Addon                           cluster-kube-proxy                         create
//  +      ├─ aws:eks:Addon                           cluster-coredns                            create
//  +      ├─ kubernetes:core/v1:ConfigMap            cluster-nodeAccess                         create
//  +      ├─ eks:index:VpcCniAddon                   cluster-vpc-cni                            create
//  +      │  └─ aws:eks:Addon                        cluster-vpc-cni                            create
//  +      ├─ aws:ec2:SecurityGroupRule               cluster-eksClusterIngressRule              create
//  +      ├─ aws:ec2:SecurityGroupRule               cluster-eksNodeInternetEgressRule          create
//  +      ├─ aws:ec2:SecurityGroupRule               cluster-eksNodeClusterIngressRule          create
//  +      ├─ aws:ec2:SecurityGroupRule               cluster-eksExtApiServerClusterIngressRule  create
//  +      ├─ aws:ec2:SecurityGroupRule               cluster-eksNodeIngressRule                 create
//  +      ├─ aws:ec2:LaunchTemplate                  cluster-launchTemplate                     create
//  +      └─ aws:autoscaling:Group                   cluster                                    create
// Outputs:
//     kubeconfig: output<string>

// Resources:
//     + 61 to create

// Do you want to perform this update? details
// + pulumi:pulumi:Stack: (create)
//     [urn=urn:pulumi:dev::aws-project-1::pulumi:pulumi:Stack::aws-project-1-dev]
//     + awsx:ec2:Vpc: (create)
//         [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc::vpc]
//         + aws:ec2/vpc:Vpc: (create)
//             [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc::vpc]
//             [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//             cidrBlock       : "10.0.0.0/16"
//             enableDnsSupport: true
//             tags            : {
//                 Name: "vpc"
//             }
//             tagsAll         : {
//                 Name: "vpc"
//             }
//             + aws:ec2/subnet:Subnet: (create)
//                 [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/subnet:Subnet::vpc-private-2]
//                 [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                 assignIpv6AddressOnCreation            : false
//                 availabilityZone                       : "eu-north-1b"
//                 cidrBlock                              : "10.0.64.0/19"
//                 enableDns64                            : false
//                 enableResourceNameDnsARecordOnLaunch   : false
//                 enableResourceNameDnsAaaaRecordOnLaunch: false
//                 ipv6Native                             : false
//                 mapPublicIpOnLaunch                    : false
//                 tags                                   : {
//                     Name      : "vpc-private-2"
//                     SubnetType: "Private"
//                 }
//                 tagsAll                                : {
//                     Name      : "vpc-private-2"
//                     SubnetType: "Private"
//                 }
//                 vpcId                                  : output<string>
//             + aws:ec2/subnet:Subnet: (create)
//                 [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/subnet:Subnet::vpc-private-3]
//                 [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                 assignIpv6AddressOnCreation            : false
//                 availabilityZone                       : "eu-north-1c"
//                 cidrBlock                              : "10.0.128.0/19"
//                 enableDns64                            : false
//                 enableResourceNameDnsARecordOnLaunch   : false
//                 enableResourceNameDnsAaaaRecordOnLaunch: false
//                 ipv6Native                             : false
//                 mapPublicIpOnLaunch                    : false
//                 tags                                   : {
//                     Name      : "vpc-private-3"
//                     SubnetType: "Private"
//                 }
//                 tagsAll                                : {
//                     Name      : "vpc-private-3"
//                     SubnetType: "Private"
//                 }
//                 vpcId                                  : output<string>
//             + aws:ec2/subnet:Subnet: (create)
//                 [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/subnet:Subnet::vpc-public-3]
//                 [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                 assignIpv6AddressOnCreation            : false
//                 availabilityZone                       : "eu-north-1c"
//                 cidrBlock                              : "10.0.160.0/20"
//                 enableDns64                            : false
//                 enableResourceNameDnsARecordOnLaunch   : false
//                 enableResourceNameDnsAaaaRecordOnLaunch: false
//                 ipv6Native                             : false
//                 mapPublicIpOnLaunch                    : true
//                 tags                                   : {
//                     Name      : "vpc-public-3"
//                     SubnetType: "Public"
//                 }
//                 tagsAll                                : {
//                     Name      : "vpc-public-3"
//                     SubnetType: "Public"
//                 }
//                 vpcId                                  : output<string>
//             + aws:ec2/subnet:Subnet: (create)
//                 [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/subnet:Subnet::vpc-public-1]
//                 [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                 assignIpv6AddressOnCreation            : false
//                 availabilityZone                       : "eu-north-1a"
//                 cidrBlock                              : "10.0.32.0/20"
//                 enableDns64                            : false
//                 enableResourceNameDnsARecordOnLaunch   : false
//                 enableResourceNameDnsAaaaRecordOnLaunch: false
//                 ipv6Native                             : false
//                 mapPublicIpOnLaunch                    : true
//                 tags                                   : {
//                     Name      : "vpc-public-1"
//                     SubnetType: "Public"
//                 }
//                 tagsAll                                : {
//                     Name      : "vpc-public-1"
//                     SubnetType: "Public"
//                 }
//                 vpcId                                  : output<string>
//             + aws:ec2/internetGateway:InternetGateway: (create)
//                 [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/internetGateway:InternetGateway::vpc]
//                 [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                 tags      : {
//                     Name: "vpc"
//                 }
//                 tagsAll   : {
//                     Name: "vpc"
//                 }
//                 vpcId     : output<string>
//             + aws:ec2/subnet:Subnet: (create)
//                 [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/subnet:Subnet::vpc-public-2]
//                 [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                 assignIpv6AddressOnCreation            : false
//                 availabilityZone                       : "eu-north-1b"
//                 cidrBlock                              : "10.0.96.0/20"
//                 enableDns64                            : false
//                 enableResourceNameDnsARecordOnLaunch   : false
//                 enableResourceNameDnsAaaaRecordOnLaunch: false
//                 ipv6Native                             : false
//                 mapPublicIpOnLaunch                    : true
//                 tags                                   : {
//                     Name      : "vpc-public-2"
//                     SubnetType: "Public"
//                 }
//                 tagsAll                                : {
//                     Name      : "vpc-public-2"
//                     SubnetType: "Public"
//                 }
//                 vpcId                                  : output<string>
//             + aws:ec2/subnet:Subnet: (create)
//                 [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/subnet:Subnet::vpc-private-1]
//                 [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                 assignIpv6AddressOnCreation            : false
//                 availabilityZone                       : "eu-north-1a"
//                 cidrBlock                              : "10.0.0.0/19"
//                 enableDns64                            : false
//                 enableResourceNameDnsARecordOnLaunch   : false
//                 enableResourceNameDnsAaaaRecordOnLaunch: false
//                 ipv6Native                             : false
//                 mapPublicIpOnLaunch                    : false
//                 tags                                   : {
//                     Name      : "vpc-private-1"
//                     SubnetType: "Private"
//                 }
//                 tagsAll                                : {
//                     Name      : "vpc-private-1"
//                     SubnetType: "Private"
//                 }
//                 vpcId                                  : output<string>
//                 + aws:ec2/routeTable:RouteTable: (create)
//                     [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/subnet:Subnet$aws:ec2/routeTable:RouteTable::vpc-private-2]
//                     [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                     tags      : {
//                         Name      : "vpc-private-2"
//                         SubnetType: "Private"
//                     }
//                     tagsAll   : {
//                         Name      : "vpc-private-2"
//                         SubnetType: "Private"
//                     }
//                     vpcId     : output<string>
//                 + aws:ec2/eip:Eip: (create)
//                     [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/subnet:Subnet$aws:ec2/eip:Eip::vpc-1]
//                     [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                     tags      : {
//                         Name: "vpc-1"
//                     }
//                     tagsAll   : {
//                         Name: "vpc-1"
//                     }
//                 + aws:ec2/routeTable:RouteTable: (create)
//                     [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/subnet:Subnet$aws:ec2/routeTable:RouteTable::vpc-public-2]
//                     [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                     tags      : {
//                         Name      : "vpc-public-2"
//                         SubnetType: "Public"
//                     }
//                     tagsAll   : {
//                         Name      : "vpc-public-2"
//                         SubnetType: "Public"
//                     }
//                     vpcId     : output<string>
//                 + aws:ec2/eip:Eip: (create)
//                     [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/subnet:Subnet$aws:ec2/eip:Eip::vpc-2]
//                     [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                     tags      : {
//                         Name: "vpc-2"
//                     }
//                     tagsAll   : {
//                         Name: "vpc-2"
//                     }
//                 + aws:ec2/routeTable:RouteTable: (create)
//                     [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/subnet:Subnet$aws:ec2/routeTable:RouteTable::vpc-private-3]
//                     [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                     tags      : {
//                         Name      : "vpc-private-3"
//                         SubnetType: "Private"
//                     }
//                     tagsAll   : {
//                         Name      : "vpc-private-3"
//                         SubnetType: "Private"
//                     }
//                     vpcId     : output<string>
//                 + aws:ec2/routeTable:RouteTable: (create)
//                     [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/subnet:Subnet$aws:ec2/routeTable:RouteTable::vpc-public-1]
//                     [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                     tags      : {
//                         Name      : "vpc-public-1"
//                         SubnetType: "Public"
//                     }
//                     tagsAll   : {
//                         Name      : "vpc-public-1"
//                         SubnetType: "Public"
//                     }
//                     vpcId     : output<string>
//                 + aws:ec2/eip:Eip: (create)
//                     [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/subnet:Subnet$aws:ec2/eip:Eip::vpc-3]
//                     [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                     tags      : {
//                         Name: "vpc-3"
//                     }
//                     tagsAll   : {
//                         Name: "vpc-3"
//                     }
//                 + aws:ec2/routeTable:RouteTable: (create)
//                     [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/subnet:Subnet$aws:ec2/routeTable:RouteTable::vpc-public-3]
//                     [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                     tags      : {
//                         Name      : "vpc-public-3"
//                         SubnetType: "Public"
//                     }
//                     tagsAll   : {
//                         Name      : "vpc-public-3"
//                         SubnetType: "Public"
//                     }
//                     vpcId     : output<string>
//                     + aws:ec2/routeTableAssociation:RouteTableAssociation: (create)
//                         [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/subnet:Subnet$aws:ec2/routeTable:RouteTable$aws:ec2/routeTableAssociation:RouteTableAssociation::vpc-private-2]
//                         [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                         routeTableId: output<string>
//                         subnetId    : output<string>
//                 + aws:ec2/routeTable:RouteTable: (create)
//                     [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/subnet:Subnet$aws:ec2/routeTable:RouteTable::vpc-private-1]
//                     [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                     tags      : {
//                         Name      : "vpc-private-1"
//                         SubnetType: "Private"
//                     }
//                     tagsAll   : {
//                         Name      : "vpc-private-1"
//                         SubnetType: "Private"
//                     }
//                     vpcId     : output<string>
//                     + aws:ec2/route:Route: (create)
//                         [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/subnet:Subnet$aws:ec2/routeTable:RouteTable$aws:ec2/route:Route::vpc-public-2]
//                         [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                         destinationCidrBlock: "0.0.0.0/0"
//                         gatewayId           : output<string>
//                         routeTableId        : output<string>
//                     + aws:ec2/route:Route: (create)
//                         [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/subnet:Subnet$aws:ec2/routeTable:RouteTable$aws:ec2/route:Route::vpc-public-3]
//                         [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                         destinationCidrBlock: "0.0.0.0/0"
//                         gatewayId           : output<string>
//                         routeTableId        : output<string>
//                     + aws:ec2/routeTableAssociation:RouteTableAssociation: (create)
//                         [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/subnet:Subnet$aws:ec2/routeTable:RouteTable$aws:ec2/routeTableAssociation:RouteTableAssociation::vpc-public-2]
//                         [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                         routeTableId: output<string>
//                         subnetId    : output<string>
//                 + aws:ec2/natGateway:NatGateway: (create)
//                     [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/subnet:Subnet$aws:ec2/natGateway:NatGateway::vpc-2]
//                     [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                     allocationId    : output<string>
//                     connectivityType: "public"
//                     subnetId        : output<string>
//                     tags            : {
//                         Name: "vpc-2"
//                     }
//                     tagsAll         : {
//                         Name: "vpc-2"
//                     }
//                 + aws:ec2/natGateway:NatGateway: (create)
//                     [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/subnet:Subnet$aws:ec2/natGateway:NatGateway::vpc-1]
//                     [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                     allocationId    : output<string>
//                     connectivityType: "public"
//                     subnetId        : output<string>
//                     tags            : {
//                         Name: "vpc-1"
//                     }
//                     tagsAll         : {
//                         Name: "vpc-1"
//                     }
//                     + aws:ec2/routeTableAssociation:RouteTableAssociation: (create)
//                         [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/subnet:Subnet$aws:ec2/routeTable:RouteTable$aws:ec2/routeTableAssociation:RouteTableAssociation::vpc-private-3]
//                         [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                         routeTableId: output<string>
//                         subnetId    : output<string>
//                     + aws:ec2/route:Route: (create)
//                         [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/subnet:Subnet$aws:ec2/routeTable:RouteTable$aws:ec2/route:Route::vpc-public-1]
//                         [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                         destinationCidrBlock: "0.0.0.0/0"
//                         gatewayId           : output<string>
//                         routeTableId        : output<string>
//                     + aws:ec2/routeTableAssociation:RouteTableAssociation: (create)
//                         [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/subnet:Subnet$aws:ec2/routeTable:RouteTable$aws:ec2/routeTableAssociation:RouteTableAssociation::vpc-public-3]
//                         [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                         routeTableId: output<string>
//                         subnetId    : output<string>
//                 + aws:ec2/natGateway:NatGateway: (create)
//                     [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/subnet:Subnet$aws:ec2/natGateway:NatGateway::vpc-3]
//                     [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                     allocationId    : output<string>
//                     connectivityType: "public"
//                     subnetId        : output<string>
//                     tags            : {
//                         Name: "vpc-3"
//                     }
//                     tagsAll         : {
//                         Name: "vpc-3"
//                     }
//                     + aws:ec2/routeTableAssociation:RouteTableAssociation: (create)
//                         [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/subnet:Subnet$aws:ec2/routeTable:RouteTable$aws:ec2/routeTableAssociation:RouteTableAssociation::vpc-public-1]
//                         [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                         routeTableId: output<string>
//                         subnetId    : output<string>
//                     + aws:ec2/routeTableAssociation:RouteTableAssociation: (create)
//                         [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/subnet:Subnet$aws:ec2/routeTable:RouteTable$aws:ec2/routeTableAssociation:RouteTableAssociation::vpc-private-1]
//                         [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                         routeTableId: output<string>
//                         subnetId    : output<string>
//                     + aws:ec2/route:Route: (create)
//                         [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/subnet:Subnet$aws:ec2/routeTable:RouteTable$aws:ec2/route:Route::vpc-private-2]
//                         [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                         destinationCidrBlock: "0.0.0.0/0"
//                         natGatewayId        : output<string>
//                         routeTableId        : output<string>
//                     + aws:ec2/route:Route: (create)
//                         [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/subnet:Subnet$aws:ec2/routeTable:RouteTable$aws:ec2/route:Route::vpc-private-3]
//                         [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                         destinationCidrBlock: "0.0.0.0/0"
//                         natGatewayId        : output<string>
//                         routeTableId        : output<string>
//                     + aws:ec2/route:Route: (create)
//                         [urn=urn:pulumi:dev::aws-project-1::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/subnet:Subnet$aws:ec2/routeTable:RouteTable$aws:ec2/route:Route::vpc-private-1]
//                         [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_59_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                         destinationCidrBlock: "0.0.0.0/0"
//                         natGatewayId        : output<string>
//                         routeTableId        : output<string>
//     + eks:index:Cluster: (create)
//         [urn=urn:pulumi:dev::aws-project-1::eks:index:Cluster::cluster]
//         + eks:index:ServiceRole: (create)
//             [urn=urn:pulumi:dev::aws-project-1::eks:index:Cluster$eks:index:ServiceRole::cluster-eksRole]
//         + eks:index:ServiceRole: (create)
//             [urn=urn:pulumi:dev::aws-project-1::eks:index:Cluster$eks:index:ServiceRole::cluster-instanceRole]
//             + aws:iam/role:Role: (create)
//                 [urn=urn:pulumi:dev::aws-project-1::eks:index:Cluster$eks:index:ServiceRole$aws:iam/role:Role::cluster-eksRole-role]
//                 [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_66_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                 assumeRolePolicy   : (json) {
//                     Statement: [
//                         [0]: {
//                             Action   : [
//                                 [0]: "sts:AssumeRole"
//                                 [1]: "sts:TagSession"
//                             ]
//                             Effect   : "Allow"
//                             Principal: {
//                                 Service: [
//                                     [0]: "eks.amazonaws.com"
//                                 ]
//                             }
//                         }
//                     ]
//                     Version  : "2012-10-17"
//                 }

//                 description        : "Allows EKS to manage clusters on your behalf."
//                 forceDetachPolicies: false
//                 maxSessionDuration : 3600
//                 name               : "cluster-eksRole-role-9c87f95"
//                 path               : "/"
//             + aws:iam/role:Role: (create)
//                 [urn=urn:pulumi:dev::aws-project-1::eks:index:Cluster$eks:index:ServiceRole$aws:iam/role:Role::cluster-instanceRole-role]
//                 [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_66_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                 assumeRolePolicy   : (json) {
//                     Statement: [
//                         [0]: {
//                             Action   : [
//                                 [0]: "sts:AssumeRole"
//                             ]
//                             Effect   : "Allow"
//                             Principal: {
//                                 Service: [
//                                     [0]: "ec2.amazonaws.com"
//                                 ]
//                             }
//                         }
//                     ]
//                     Version  : "2012-10-17"
//                 }

//                 forceDetachPolicies: false
//                 maxSessionDuration : 3600
//                 name               : "cluster-instanceRole-role-51e53d8"
//                 path               : "/"
//             + aws:iam/rolePolicyAttachment:RolePolicyAttachment: (create)
//                 [urn=urn:pulumi:dev::aws-project-1::eks:index:Cluster$eks:index:ServiceRole$aws:iam/rolePolicyAttachment:RolePolicyAttachment::cluster-instanceRole-03516f97]
//                 [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_66_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                 policyArn : "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
//                 role      : output<string>
//             + aws:iam/rolePolicyAttachment:RolePolicyAttachment: (create)
//                 [urn=urn:pulumi:dev::aws-project-1::eks:index:Cluster$eks:index:ServiceRole$aws:iam/rolePolicyAttachment:RolePolicyAttachment::cluster-eksRole-4b490823]
//                 [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_66_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                 policyArn : "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
//                 role      : output<string>
//             + aws:iam/rolePolicyAttachment:RolePolicyAttachment: (create)
//                 [urn=urn:pulumi:dev::aws-project-1::eks:index:Cluster$eks:index:ServiceRole$aws:iam/rolePolicyAttachment:RolePolicyAttachment::cluster-instanceRole-3eb088f2]
//                 [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_66_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                 policyArn : "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
//                 role      : output<string>
//             + aws:iam/rolePolicyAttachment:RolePolicyAttachment: (create)
//                 [urn=urn:pulumi:dev::aws-project-1::eks:index:Cluster$eks:index:ServiceRole$aws:iam/rolePolicyAttachment:RolePolicyAttachment::cluster-instanceRole-e1b295bd]
//                 [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_66_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                 policyArn : "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
//                 role      : output<string>
//         + aws:iam/instanceProfile:InstanceProfile: (create)
//             [urn=urn:pulumi:dev::aws-project-1::eks:index:Cluster$aws:iam/instanceProfile:InstanceProfile::cluster-instanceProfile]
//             [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_66_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//             name      : "cluster-instanceProfile-a740be0"
//             path      : "/"
//             role      : output<string>
//         + aws:ec2/securityGroup:SecurityGroup: (create)
//             [urn=urn:pulumi:dev::aws-project-1::eks:index:Cluster$aws:ec2/securityGroup:SecurityGroup::cluster-eksClusterSecurityGroup]
//             [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_66_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//             description        : "Managed by Pulumi"
//             name               : "cluster-eksClusterSecurityGroup-3ac7be6"
//             revokeRulesOnDelete: true
//             tags               : {
//                 Name: "cluster-eksClusterSecurityGroup"
//             }
//             tagsAll            : {
//                 Name: "cluster-eksClusterSecurityGroup"
//             }
//             vpcId              : "vpc-06b9edbb867bcdf27"
//         + aws:eks/cluster:Cluster: (create)
//             [urn=urn:pulumi:dev::aws-project-1::eks:index:Cluster$aws:eks/cluster:Cluster::cluster-eksCluster]
//             [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_66_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//             bootstrapSelfManagedAddons: true
//             name                      : "cluster-eksCluster-8062506"
//             roleArn                   : output<string>
//             tags                      : {
//                 Name: "cluster-eksCluster"
//             }
//             tagsAll                   : {
//                 Name: "cluster-eksCluster"
//             }
//             vpcConfig                 : {
//                 endpointPrivateAccess: false
//                 endpointPublicAccess : true
//                 securityGroupIds     : [
//                     [0]: output<string>
//                 ]
//                 subnetIds            : output<string>
//             }
//         + aws:ec2/securityGroupRule:SecurityGroupRule: (create)
//             [urn=urn:pulumi:dev::aws-project-1::eks:index:Cluster$aws:ec2/securityGroupRule:SecurityGroupRule::cluster-eksClusterInternetEgressRule]
//             [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_66_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//             cidrBlocks     : [
//                 [0]: "0.0.0.0/0"
//             ]
//             description    : "Allow internet access."
//             fromPort       : 0
//             protocol       : "-1"
//             securityGroupId: output<string>
//             toPort         : 0
//             type           : "egress"
//         + pulumi:providers:kubernetes: (create)
//             [urn=urn:pulumi:dev::aws-project-1::eks:index:Cluster$pulumi:providers:kubernetes::cluster-eks-k8s]
//             kubeconfig: output<string>
//             version   : "4.19.0"
//         + aws:ec2/securityGroup:SecurityGroup: (create)
//             [urn=urn:pulumi:dev::aws-project-1::eks:index:Cluster$aws:ec2/securityGroup:SecurityGroup::cluster-nodeSecurityGroup]
//             [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_66_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//             description        : "Managed by Pulumi"
//             name               : "cluster-nodeSecurityGroup-2890a1b"
//             revokeRulesOnDelete: true
//             tags               : {
//                 Name                                            : "cluster-nodeSecurityGroup"
//                 kubernetes.io/cluster/cluster-eksCluster-8062506: "owned"
//             }
//             tagsAll            : {
//                 Name                                            : "cluster-nodeSecurityGroup"
//                 kubernetes.io/cluster/cluster-eksCluster-8062506: "owned"
//             }
//             vpcId              : "vpc-06b9edbb867bcdf27"
//         + aws:eks/addon:Addon: (create)
//             [urn=urn:pulumi:dev::aws-project-1::eks:index:Cluster$aws:eks/addon:Addon::cluster-kube-proxy]
//             [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_66_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//             addonName               : "kube-proxy"
//             addonVersion            : output<string>
//             clusterName             : "cluster-eksCluster-8062506"
//             preserve                : true
//             resolveConflictsOnCreate: "OVERWRITE"
//             resolveConflictsOnUpdate: "OVERWRITE"
//         + aws:eks/addon:Addon: (create)
//             [urn=urn:pulumi:dev::aws-project-1::eks:index:Cluster$aws:eks/addon:Addon::cluster-coredns]
//             [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_66_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//             addonName               : "coredns"
//             addonVersion            : output<string>
//             clusterName             : "cluster-eksCluster-8062506"
//             preserve                : true
//             resolveConflictsOnCreate: "OVERWRITE"
//             resolveConflictsOnUpdate: "OVERWRITE"
//         + kubernetes:core/v1:ConfigMap: (create)
//             [urn=urn:pulumi:dev::aws-project-1::eks:index:Cluster$kubernetes:core/v1:ConfigMap::cluster-nodeAccess]
//             [provider=urn:pulumi:dev::aws-project-1::eks:index:Cluster$pulumi:providers:kubernetes::cluster-eks-k8s::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//             apiVersion: "v1"
//             data      : {
//                 mapRoles: output<string>
//             }
//             immutable : false
//             kind      : "ConfigMap"
//             metadata  : {
//                 annotations: {
//                     pulumi.com/patchForce: "true"
//                 }
//                 name       : "aws-auth"
//                 namespace  : "kube-system"
//             }
//         + eks:index:VpcCniAddon: (create)
//             [urn=urn:pulumi:dev::aws-project-1::eks:index:Cluster$eks:index:VpcCniAddon::cluster-vpc-cni]
//         + aws:ec2/securityGroupRule:SecurityGroupRule: (create)
//             [urn=urn:pulumi:dev::aws-project-1::eks:index:Cluster$aws:ec2/securityGroupRule:SecurityGroupRule::cluster-eksClusterIngressRule]
//             [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_66_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//             description          : "Allow pods to communicate with the cluster API Server"
//             fromPort             : 443
//             protocol             : "tcp"
//             securityGroupId      : output<string>
//             sourceSecurityGroupId: output<string>
//             toPort               : 443
//             type                 : "ingress"
//         + aws:ec2/securityGroupRule:SecurityGroupRule: (create)
//             [urn=urn:pulumi:dev::aws-project-1::eks:index:Cluster$aws:ec2/securityGroupRule:SecurityGroupRule::cluster-eksNodeInternetEgressRule]
//             [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_66_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//             cidrBlocks     : [
//                 [0]: "0.0.0.0/0"
//             ]
//             description    : "Allow internet access."
//             fromPort       : 0
//             protocol       : "-1"
//             securityGroupId: output<string>
//             toPort         : 0
//             type           : "egress"
//         + aws:ec2/securityGroupRule:SecurityGroupRule: (create)
//             [urn=urn:pulumi:dev::aws-project-1::eks:index:Cluster$aws:ec2/securityGroupRule:SecurityGroupRule::cluster-eksNodeClusterIngressRule]
//             [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_66_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//             description          : "Allow worker Kubelets and pods to receive communication from the cluster control plane"
//             fromPort             : 1025
//             protocol             : "tcp"
//             securityGroupId      : output<string>
//             sourceSecurityGroupId: output<string>
//             toPort               : 65535
//             type                 : "ingress"
//         + aws:ec2/securityGroupRule:SecurityGroupRule: (create)
//             [urn=urn:pulumi:dev::aws-project-1::eks:index:Cluster$aws:ec2/securityGroupRule:SecurityGroupRule::cluster-eksExtApiServerClusterIngressRule]
//             [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_66_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//             description          : "Allow pods running extension API servers on port 443 to receive communication from cluster control plane"
//             fromPort             : 443
//             protocol             : "tcp"
//             securityGroupId      : output<string>
//             sourceSecurityGroupId: output<string>
//             toPort               : 443
//             type                 : "ingress"
//         + aws:ec2/securityGroupRule:SecurityGroupRule: (create)
//             [urn=urn:pulumi:dev::aws-project-1::eks:index:Cluster$aws:ec2/securityGroupRule:SecurityGroupRule::cluster-eksNodeIngressRule]
//             [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_66_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//             description    : "Allow nodes to communicate with each other"
//             fromPort       : 0
//             protocol       : "-1"
//             securityGroupId: output<string>
//             self           : true
//             toPort         : 0
//             type           : "ingress"
//             + aws:eks/addon:Addon: (create)
//                 [urn=urn:pulumi:dev::aws-project-1::eks:index:Cluster$eks:index:VpcCniAddon$aws:eks/addon:Addon::cluster-vpc-cni]
//                 [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_66_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//                 addonName               : "vpc-cni"
//                 addonVersion            : output<string>
//                 clusterName             : "cluster-eksCluster-8062506"
//                 configurationValues     : (json) {
//                     env : {
//                         AWS_VPC_ENI_MTU                   : "9001"
//                         AWS_VPC_K8S_CNI_CUSTOM_NETWORK_CFG: "false"
//                         AWS_VPC_K8S_CNI_EXTERNALSNAT      : "false"
//                         AWS_VPC_K8S_CNI_LOGLEVEL          : "DEBUG"
//                         AWS_VPC_K8S_CNI_LOG_FILE          : "/host/var/log/aws-routed-eni/ipamd.log"
//                         AWS_VPC_K8S_CNI_VETHPREFIX        : "eni"
//                         AWS_VPC_K8S_PLUGIN_LOG_FILE       : "/var/log/aws-routed-eni/plugin.log"
//                         AWS_VPC_K8S_PLUGIN_LOG_LEVEL      : "DEBUG"
//                         ENABLE_POD_ENI                    : "false"
//                         WARM_ENI_TARGET                   : "1"
//                     }
//                     init: {
//                         env: {
//                             DISABLE_TCP_EARLY_DEMUX: "false"
//                         }
//                     }
//                 }

//                 preserve                : true
//                 resolveConflictsOnCreate: "OVERWRITE"
//                 resolveConflictsOnUpdate: "OVERWRITE"
//         + aws:ec2/launchTemplate:LaunchTemplate: (create)
//             [urn=urn:pulumi:dev::aws-project-1::eks:index:Cluster$aws:ec2/launchTemplate:LaunchTemplate::cluster-launchTemplate]
//             [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_66_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//             blockDeviceMappings: []
//             iamInstanceProfile : {
//                 name      : output<string>
//             }
//             imageId            : output<string>
//             instanceType       : "t3.micro"
//             name               : "cluster-launchTemplate-3074693"
//             networkInterfaces  : [
//                 [0]: {
//                     associatePublicIpAddress: "true"
//                     securityGroups          : output<string>
//                 }
//             ]
//             userData           : output<string>
//         + aws:autoscaling/group:Group: (create)
//             [urn=urn:pulumi:dev::aws-project-1::eks:index:Cluster$aws:autoscaling/group:Group::cluster]
//             [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_66_1::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//             desiredCapacity              : 2
//             forceDelete                  : false
//             forceDeleteWarmPool          : false
//             healthCheckGracePeriod       : 300
//             ignoreFailedScalingActivities: false
//             instanceRefresh              : {
//                 preferences: {
//                     maxHealthyPercentage     : 100
//                     minHealthyPercentage     : 50
//                     scaleInProtectedInstances: "Ignore"
//                     skipMatching             : false
//                     standbyInstances         : "Ignore"
//                 }
//                 strategy   : "Rolling"
//             }
//             launchTemplate               : {
//                 name      : "cluster-launchTemplate-3074693"
//                 version   : output<string>
//             }
//             maxSize                      : 2
//             metricsGranularity           : "1Minute"
//             minSize                      : 1
//             name                         : "cluster-212cf4f"
//             protectFromScaleIn           : false
//             tags                         : [
//                 [0]: {
//                     key              : "kubernetes.io/cluster/cluster-eksCluster-8062506"
//                     propagateAtLaunch: true
//                     value            : "owned"
//                 }
//                 [1]: {
//                     key              : "Name"
//                     propagateAtLaunch: true
//                     value            : "cluster-eksCluster-8062506-worker"
//                 }
//             ]
//             vpcZoneIdentifiers           : output<string>
//             waitForCapacityTimeout       : "10m"
//     --outputs:--
//     kubeconfig: output<string>

// Do you want to perform this update? yes
// Updating (dev)

// View in Browser (Ctrl+O): https://app.pulumi.com/yashwanth/aws-project-1/dev/updates/6

//      Type                                          Name                                  Status                  Info
//  +   pulumi:pulumi:Stack                           aws-project-1-dev                     **creating failed**     2 errors
//  +   ├─ awsx:ec2:Vpc                               vpc                                   created (2s)
//  +   │  └─ aws:ec2:Vpc                             vpc                                   created (2s)
//  +   │     ├─ aws:ec2:Subnet                       vpc-private-3                         created (1s)
//  +   │     │  └─ aws:ec2:RouteTable                vpc-private-3                         created (2s)
//  +   │     │     ├─ aws:ec2:RouteTableAssociation  vpc-private-3                         created (1s)
//  +   │     │     └─ aws:ec2:Route                  vpc-private-3                         created (1s)
//  +   │     ├─ aws:ec2:InternetGateway              vpc                                   created (2s)
//  +   │     ├─ aws:ec2:Subnet                       vpc-public-2                          created (12s)
//  +   │     │  ├─ aws:ec2:Eip                       vpc-2                                 created (1s)
//  +   │     │  ├─ aws:ec2:RouteTable                vpc-public-2                          created (2s)
//  +   │     │  │  ├─ aws:ec2:RouteTableAssociation  vpc-public-2                          created (1s)
//  +   │     │  │  └─ aws:ec2:Route                  vpc-public-2                          created (2s)
//  +   │     │  └─ aws:ec2:NatGateway                vpc-2                                 created (119s)
//  +   │     ├─ aws:ec2:Subnet                       vpc-private-2                         created (2s)
//  +   │     │  └─ aws:ec2:RouteTable                vpc-private-2                         created (2s)
//  +   │     │     ├─ aws:ec2:RouteTableAssociation  vpc-private-2                         created (1s)
//  +   │     │     └─ aws:ec2:Route                  vpc-private-2                         created (1s)
//  +   │     ├─ aws:ec2:Subnet                       vpc-public-1                          created (13s)
//  +   │     │  ├─ aws:ec2:RouteTable                vpc-public-1                          created (3s)
//  +   │     │  │  ├─ aws:ec2:RouteTableAssociation  vpc-public-1                          created (3s)
//  +   │     │  │  └─ aws:ec2:Route                  vpc-public-1                          created (4s)
//  +   │     │  ├─ aws:ec2:Eip                       vpc-1                                 created (3s)
//  +   │     │  └─ aws:ec2:NatGateway                vpc-1                                 created (109s)
//  +   │     ├─ aws:ec2:Subnet                       vpc-public-3                          created (13s)
//  +   │     │  ├─ aws:ec2:Eip                       vpc-3                                 created (2s)
//  +   │     │  ├─ aws:ec2:RouteTable                vpc-public-3                          created (2s)
//  +   │     │  │  ├─ aws:ec2:RouteTableAssociation  vpc-public-3                          created (4s)
//  +   │     │  │  └─ aws:ec2:Route                  vpc-public-3                          created (5s)
//  +   │     │  └─ aws:ec2:NatGateway                vpc-3                                 created (99s)
//  +   │     └─ aws:ec2:Subnet                       vpc-private-1                         created (4s)
//  +   │        └─ aws:ec2:RouteTable                vpc-private-1                         created (1s)
//  +   │           ├─ aws:ec2:RouteTableAssociation  vpc-private-1                         created (1s)
//  +   │           └─ aws:ec2:Route                  vpc-private-1                         created (1s)
//  +   └─ eks:index:Cluster                          cluster                               created
//  +      ├─ eks:index:ServiceRole                   cluster-instanceRole                  created (8s)
//  +      │  ├─ aws:iam:Role                         cluster-instanceRole-role             created (2s)
//  +      │  ├─ aws:iam:RolePolicyAttachment         cluster-instanceRole-3eb088f2         created (1s)
//  +      │  ├─ aws:iam:RolePolicyAttachment         cluster-instanceRole-03516f97         created (1s)
//  +      │  └─ aws:iam:RolePolicyAttachment         cluster-instanceRole-e1b295bd         created (1s)
//  +      ├─ eks:index:ServiceRole                   cluster-eksRole                       created (9s)
//  +      │  ├─ aws:iam:Role                         cluster-eksRole-role                  created (2s)
//  +      │  └─ aws:iam:RolePolicyAttachment         cluster-eksRole-4b490823              created (1s)
//  +      ├─ aws:ec2:SecurityGroup                   cluster-eksClusterSecurityGroup       created (3s)
//  +      ├─ aws:iam:InstanceProfile                 cluster-instanceProfile               created (7s)
//  +      ├─ aws:ec2:SecurityGroupRule               cluster-eksClusterInternetEgressRule  created (1s)
//  +      └─ aws:eks:Cluster                         cluster-eksCluster                    **creating failed**     2 errors
// Diagnostics:
//   aws:eks:Cluster (cluster-eksCluster):
//     error:   sdk-v2/provider2.go:515: sdk.helper_schema: creating EKS Cluster (cluster-eksCluster-fd8d060): operation error EKS: CreateCluster, https response error StatusCode: 403, RequestID: 62072b0f-98a8-4840-958e-5c7655ab5df6, api error AccessDeniedException: User: arn:aws:iam::183295454532:user/yashwanth-pulumi is not authorized to perform: eks:CreateCluster on resource: arn:aws:eks:eu-north-1:183295454532:cluster/cluster-eksCluster-fd8d060: provider=aws@6.66.1
//     error: 1 error occurred:
//         * creating EKS Cluster (cluster-eksCluster-fd8d060): operation error EKS: CreateCluster, https response error StatusCode: 403, RequestID: 62072b0f-98a8-4840-958e-5c7655ab5df6, api error AccessDeniedException: User: arn:aws:iam::183295454532:user/yashwanth-pulumi is not authorized to perform: eks:CreateCluster on resource: arn:aws:eks:eu-north-1:183295454532:cluster/cluster-eksCluster-fd8d060

//   pulumi:pulumi:Stack (aws-project-1-dev):
//     error: update failed
//     error: eks:index:Cluster resource 'cluster' has a problem: grpc: the client connection is closing

// Resources:
//     + 46 created

// Duration: 2m59s

// PS D:\Yashwanth\HTW_Berlin\Self_Learnings\Pulumi>
// PS D:\Yashwanth\HTW_Berlin\Self_Learnings\Pulumi>
// PS D:\Yashwanth\HTW_Berlin\Self_Learnings\Pulumi> pulumi destroy
// Previewing destroy (dev)

// View in Browser (Ctrl+O): https://app.pulumi.com/yashwanth/aws-project-1/dev/previews/0e014c5e-7517-4c89-93af-b076181d3b6e

//      Type                                          Name                                  Plan       Info
//  -   pulumi:pulumi:Stack                           aws-project-1-dev                     delete     2 warnings
//  -   ├─ eks:index:Cluster                          cluster                               delete
//  -   │  ├─ aws:iam:InstanceProfile                 cluster-instanceProfile               delete
//  -   │  ├─ aws:ec2:SecurityGroupRule               cluster-eksClusterInternetEgressRule  delete
//  -   │  ├─ eks:index:ServiceRole                   cluster-instanceRole                  delete
//  -   │  │  ├─ aws:iam:RolePolicyAttachment         cluster-instanceRole-e1b295bd         delete
//  -   │  │  ├─ aws:iam:RolePolicyAttachment         cluster-instanceRole-3eb088f2         delete
//  -   │  │  ├─ aws:iam:RolePolicyAttachment         cluster-instanceRole-03516f97         delete
//  -   │  │  └─ aws:iam:Role                         cluster-instanceRole-role             delete
//  -   │  ├─ aws:ec2:SecurityGroup                   cluster-eksClusterSecurityGroup       delete
//  -   │  └─ eks:index:ServiceRole                   cluster-eksRole                       delete
//  -   │     ├─ aws:iam:RolePolicyAttachment         cluster-eksRole-4b490823              delete
//  -   │     └─ aws:iam:Role                         cluster-eksRole-role                  delete
//  -   └─ awsx:ec2:Vpc                               vpc                                   delete
//  -      └─ aws:ec2:Vpc                             vpc                                   delete
//  -         ├─ aws:ec2:Subnet                       vpc-public-1                          delete
//  -         │  ├─ aws:ec2:NatGateway                vpc-1                                 delete
//  -         │  ├─ aws:ec2:RouteTable                vpc-public-1                          delete
//  -         │  │  ├─ aws:ec2:Route                  vpc-public-1                          delete
//  -         │  │  └─ aws:ec2:RouteTableAssociation  vpc-public-1                          delete
//  -         │  └─ aws:ec2:Eip                       vpc-1                                 delete
//  -         ├─ aws:ec2:Subnet                       vpc-public-3                          delete
//  -         │  ├─ aws:ec2:NatGateway                vpc-3                                 delete
//  -         │  ├─ aws:ec2:RouteTable                vpc-public-3                          delete
//  -         │  │  ├─ aws:ec2:RouteTableAssociation  vpc-public-3                          delete
//  -         │  │  └─ aws:ec2:Route                  vpc-public-3                          delete
//  -         │  └─ aws:ec2:Eip                       vpc-3                                 delete
//  -         ├─ aws:ec2:InternetGateway              vpc                                   delete
//  -         ├─ aws:ec2:Subnet                       vpc-public-2                          delete
//  -         │  ├─ aws:ec2:NatGateway                vpc-2                                 delete
//  -         │  ├─ aws:ec2:RouteTable                vpc-public-2                          delete
//  -         │  │  ├─ aws:ec2:Route                  vpc-public-2                          delete
//  -         │  │  └─ aws:ec2:RouteTableAssociation  vpc-public-2                          delete
//  -         │  └─ aws:ec2:Eip                       vpc-2                                 delete
//  -         ├─ aws:ec2:Subnet                       vpc-private-2                         delete
//  -         │  └─ aws:ec2:RouteTable                vpc-private-2                         delete
//  -         │     ├─ aws:ec2:Route                  vpc-private-2                         delete
//  -         │     └─ aws:ec2:RouteTableAssociation  vpc-private-2                         delete
//  -         ├─ aws:ec2:Subnet                       vpc-private-3                         delete
//  -         │  └─ aws:ec2:RouteTable                vpc-private-3                         delete
//  -         │     ├─ aws:ec2:Route                  vpc-private-3                         delete
//  -         │     └─ aws:ec2:RouteTableAssociation  vpc-private-3                         delete
//  -         └─ aws:ec2:Subnet                       vpc-private-1                         delete
//  -            └─ aws:ec2:RouteTable                vpc-private-1                         delete
//  -               ├─ aws:ec2:Route                  vpc-private-1                         delete
//  -               └─ aws:ec2:RouteTableAssociation  vpc-private-1                         delete
// Diagnostics:
//   pulumi:pulumi:Stack (aws-project-1-dev):
//     warning: destroy operation is using an older version of package 'aws' than the specified program version: 6.59.1 < 6.66.2
//     warning: destroy operation is using an older version of package 'aws' than the specified program version: 6.66.1 < 6.66.2

// Resources:
//     - 46 to delete

// Do you want to perform this destroy? yes
// Destroying (dev)

// View in Browser (Ctrl+O): https://app.pulumi.com/yashwanth/aws-project-1/dev/updates/7

//      Type                                          Name                                  Status              Info
//  -   pulumi:pulumi:Stack                           aws-project-1-dev                     deleted (1s)        2 warnings
//  -   ├─ eks:index:Cluster                          cluster                               deleted (0.40s)
//  -   │  ├─ aws:iam:InstanceProfile                 cluster-instanceProfile               deleted (1s)
//  -   │  ├─ aws:ec2:SecurityGroupRule               cluster-eksClusterInternetEgressRule  deleted (1s)
//  -   │  ├─ eks:index:ServiceRole                   cluster-eksRole                       deleted (0.31s)
//  -   │  │  ├─ aws:iam:RolePolicyAttachment         cluster-eksRole-4b490823              deleted (0.73s)
//  -   │  │  └─ aws:iam:Role                         cluster-eksRole-role                  deleted (1s)
//  -   │  ├─ eks:index:ServiceRole                   cluster-instanceRole                  deleted (0.82s)
//  -   │  │  ├─ aws:iam:RolePolicyAttachment         cluster-instanceRole-3eb088f2         deleted (0.48s)
//  -   │  │  ├─ aws:iam:RolePolicyAttachment         cluster-instanceRole-e1b295bd         deleted (1s)
//  -   │  │  ├─ aws:iam:RolePolicyAttachment         cluster-instanceRole-03516f97         deleted (1s)
//  -   │  │  └─ aws:iam:Role                         cluster-instanceRole-role             deleted (2s)
//  -   │  └─ aws:ec2:SecurityGroup                   cluster-eksClusterSecurityGroup       deleted (2s)
//  -   └─ awsx:ec2:Vpc                               vpc                                   deleted (0.31s)
//  -      └─ aws:ec2:Vpc                             vpc                                   deleted (1s)
//  -         ├─ aws:ec2:InternetGateway              vpc                                   deleted (1s)
//  -         ├─ aws:ec2:Subnet                       vpc-public-3                          deleted (1s)
//  -         │  ├─ aws:ec2:NatGateway                vpc-3                                 deleted (74s)
//  -         │  ├─ aws:ec2:Eip                       vpc-3                                 deleted (4s)
//  -         │  └─ aws:ec2:RouteTable                vpc-public-3                          deleted (5s)
//  -         │     ├─ aws:ec2:Route                  vpc-public-3                          deleted (4s)
//  -         │     └─ aws:ec2:RouteTableAssociation  vpc-public-3                          deleted (3s)
//  -         ├─ aws:ec2:Subnet                       vpc-private-2                         deleted (2s)
//  -         │  └─ aws:ec2:RouteTable                vpc-private-2                         deleted (1s)
//  -         │     ├─ aws:ec2:Route                  vpc-private-2                         deleted (1s)
//  -         │     └─ aws:ec2:RouteTableAssociation  vpc-private-2                         deleted (4s)
//  -         ├─ aws:ec2:Subnet                       vpc-private-3                         deleted (2s)
//  -         │  └─ aws:ec2:RouteTable                vpc-private-3                         deleted (2s)
//  -         │     ├─ aws:ec2:Route                  vpc-private-3                         deleted (1s)
//  -         │     └─ aws:ec2:RouteTableAssociation  vpc-private-3                         deleted (1s)
//  -         ├─ aws:ec2:Subnet                       vpc-public-1                          deleted (2s)
//  -         │  ├─ aws:ec2:NatGateway                vpc-1                                 deleted (66s)
//  -         │  ├─ aws:ec2:RouteTable                vpc-public-1                          deleted (2s)
//  -         │  │  ├─ aws:ec2:RouteTableAssociation  vpc-public-1                          deleted (0.72s)
//  -         │  │  └─ aws:ec2:Route                  vpc-public-1                          deleted (2s)
//  -         │  └─ aws:ec2:Eip                       vpc-1                                 deleted (2s)
//  -         ├─ aws:ec2:Subnet                       vpc-public-2                          deleted (2s)
//  -         │  ├─ aws:ec2:NatGateway                vpc-2                                 deleted (62s)
//  -         │  ├─ aws:ec2:Eip                       vpc-2                                 deleted (3s)
//  -         │  └─ aws:ec2:RouteTable                vpc-public-2                          deleted (4s)
//  -         │     ├─ aws:ec2:Route                  vpc-public-2                          deleted (2s)
//  -         │     └─ aws:ec2:RouteTableAssociation  vpc-public-2                          deleted (4s)
//  -         └─ aws:ec2:Subnet                       vpc-private-1                         deleted (3s)
//  -            └─ aws:ec2:RouteTable                vpc-private-1                         deleted (2s)
//  -               ├─ aws:ec2:Route                  vpc-private-1                         deleted (1s)
//  -               └─ aws:ec2:RouteTableAssociation  vpc-private-1                         deleted (3s)
// Diagnostics:
//   pulumi:pulumi:Stack (aws-project-1-dev):
//     warning: destroy operation is using an older version of package 'aws' than the specified program version: 6.59.1 < 6.66.2
//     warning: destroy operation is using an older version of package 'aws' than the specified program version: 6.66.1 < 6.66.2

// Resources:
//     - 46 deleted

// Duration: 1m55s

// The resources in the stack have been deleted, but the history and configuration associated with the stack are still maintained.
// If you want to remove the stack completely, run `pulumi stack rm dev`.
// PS D:\Yashwanth\HTW_Berlin\Self_Learnings\Pulumi>
// PS D:\Yashwanth\HTW_Berlin\Self_Learnings\Pulumi>
// PS D:\Yashwanth\HTW_Berlin\Self_Learnings\Pulumi>