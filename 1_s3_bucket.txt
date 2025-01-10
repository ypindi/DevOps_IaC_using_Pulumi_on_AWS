"use strict";
const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");
const awsx = require("@pulumi/awsx");

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.BucketV2("pulumi-bucket");

// Export the name of the bucket
exports.bucketName = bucket.id;



// CMD Output
// PS D:\Yashwanth\HTW_Berlin\Self_Learnings\Pulumi>
// PS D:\Yashwanth\HTW_Berlin\Self_Learnings\Pulumi> pulumi up
// Previewing update (dev)

// View in Browser (Ctrl+O): https://app.pulumi.com/yashwanth/aws-project-1/dev/previews/ca4a6387-1ecd-4d29-b981-16314eae718e

//      Type                 Name               Plan
//  +   pulumi:pulumi:Stack  aws-project-1-dev  create
//  +   └─ aws:s3:BucketV2   pulumi-bucket      create
// Outputs:
//     bucketName: output<string>

// Resources:
//     + 2 to create

// Do you want to perform this update? details
// + pulumi:pulumi:Stack: (create)
//     [urn=urn:pulumi:dev::aws-project-1::pulumi:pulumi:Stack::aws-project-1-dev]
//     + aws:s3/bucketV2:BucketV2: (create)
//         [urn=urn:pulumi:dev::aws-project-1::aws:s3/bucketV2:BucketV2::pulumi-bucket]
//         [provider=urn:pulumi:dev::aws-project-1::pulumi:providers:aws::default_6_66_2::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
//         bucket      : "pulumi-bucket-dfd0d3f"
//         forceDestroy: false
//     --outputs:--
//     bucketName: output<string>

// Do you want to perform this update? yes
// Updating (dev)

// View in Browser (Ctrl+O): https://app.pulumi.com/yashwanth/aws-project-1/dev/updates/1

//      Type                 Name               Status
//  +   pulumi:pulumi:Stack  aws-project-1-dev  created (11s)
//  +   └─ aws:s3:BucketV2   pulumi-bucket      created (3s)
// Outputs:
//     bucketName: "pulumi-bucket-7e55126"

// Resources:
//     + 2 created

// Duration: 14s

// PS D:\Yashwanth\HTW_Berlin\Self_Learnings\Pulumi>
// PS D:\Yashwanth\HTW_Berlin\Self_Learnings\Pulumi>
// PS D:\Yashwanth\HTW_Berlin\Self_Learnings\Pulumi>