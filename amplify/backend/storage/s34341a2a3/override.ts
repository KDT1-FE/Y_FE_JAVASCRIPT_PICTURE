import {AmplifyS3ResourceTemplate} from '@aws-amplify/cli-extensibility-helper'

export function override(resources: AmplifyS3ResourceTemplate) {
  resources.s3Bucket.publicAccessBlockConfiguration = { blockPublicAcls: false };
  resources.addCfnResource(
    {
      type: 'AWS::S3::BucketPolicy',
      properties: {
        Bucket: {
          Ref: 'S3Bucket',
        },
        PolicyDocument: {
          Statement: [
            {
              Action: ['s3:GetObject'],
              Effect: 'Allow',
              Resource: [
                {
                  'Fn::Sub': 'arn:aws:s3:::ems980cba2a167e4a0ca6df77965effd53a121741-dev/public/*',
                },
              ],
              Principal: {
                AWS: ['*'],
              },
            },
          ],
        },
      },
    },
    'MyS3BucketPolicy'
  )
}