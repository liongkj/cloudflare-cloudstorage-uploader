import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Buffer } from 'node:buffer'; //cloudflare allows import Buffer api https://developers.cloudflare.com/workers/runtime-apis/nodejs/buffer/

export interface Env {
	S3_ENDPOINT_URL: string;
	S3_ACCESS_KEY: string;
	S3_SECRET: string;
	S3_SPACE_NAME: string;
	S3_CLOUD_REGION: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const formData = await request.formData();
		const json_data = formData.get('base64data');
		const parent_folder = formData.get("parent");
		const path = parent_folder?.split("/");
		console.log(path);
		console.log(parent_folder);

		if (!json_data) {
			return new Response('Base64 data not provided.', { status: 400 });
		}

		try {
			const jsondata = JSON.parse(json_data);
			const s3Client = new S3Client({
				endpoint: env.S3_ENDPOINT_URL,
				forcePathStyle: false,
				region: env.S3_CLOUD_REGION,
				credentials: {
					accessKeyId: env.S3_ACCESS_KEY,
					secretAccessKey: env.S3_SECRET
				}
			});

			const file_link = [];

			for (const item of jsondata) {
				const file_name = item.name;
				const file_type = item.type || '';
				let base64_data = item.link;

				if (base64_data.startsWith("data:")) {
					base64_data = base64_data.split(",")[1];
				}

				let spacePath = path ? path.join('/') + '/' : '';
				spacePath += file_name;
				console.log(spacePath);

				const fileBuffer = Buffer.from(base64_data, 'base64');
				const params = {
					Bucket: "your-bucket-name",
					ContentType: file_type,
					Body: fileBuffer,
					Key: spacePath,
					ACL: "public-read",
				};

				async function uploadToSpaceWithPublicPermissions() {
					try {
						const command = new PutObjectCommand(params);
						const uploadResult = await s3Client.send(command);
						console.log('File uploaded to Spaces with public permissions:', JSON.stringify(uploadResult));
					} catch (error) {
						console.error('Error:', error);
					}
				}

				await uploadToSpaceWithPublicPermissions();

				file_link.push({
					"name": file_name,
					"link": `https://${env.S3_SPACE_NAME}.${env.S3_CLOUD_REGION}.digitaloceanspaces.com/${spacePath}`
				});
			}

			return new Response(JSON.stringify(file_link));
		} catch (error) {
			console.error(error);
			return new Response("An error occurred.", { status: 500 });
		}
	},
};
