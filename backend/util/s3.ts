import * as AWS from 'aws-sdk'
import { v4 as uuid } from 'uuid'

const s3Client = new AWS.S3({
    region: 'ap-northeast-2',
})

export function upload(body: any) {
    const fileName = uuid()
    return new Promise<string>((resolve, reject) => {
        s3Client.upload(
            {
                Bucket: 'upload.iasa.kr',
                Key: fileName,
                Body: body,
            },
            (err: any, data: any) => {
                if (err) {
                    reject()
                }
                resolve(fileName)
            }
        )
    })
}

export function download(id: string) {
    return s3Client
        .getObject({
            Bucket: 'upload.iasa.kr',
            Key: id,
        })
        .createReadStream()
}
