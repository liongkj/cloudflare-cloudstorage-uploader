# CloudStorage Uploader


CloudStorage Uploader is a Node.js application that allows you to upload files to a cloud storage service, like AWS S3, using a Cloudflare Workers instance.

handle binary files upload in the following format
- pdf, csv, etc

## Introduction

CloudStorage Uploader is designed to help you upload files to a cloud storage service with ease. You can use this project in conjunction with a Cloudflare Workers instance to handle file uploads to your cloud storage.

## Prerequisites

Before you begin using CloudStorage Uploader, ensure you have the following prerequisites:

- A Cloudflare Workers account
- Node.js (version 14 or higher)
- npm (Node Package Manager)

## Getting Started

To get started with CloudStorage Uploader, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/liongkj/cloudflare-cloudstorage-uploader.git
   ```

2. Navigate to the project directory:

   ```bash
   cd cloudflare-cloudstorage-uploader
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

## Usage

To upload a file, send a POST request to your Cloudflare Workers endpoint with the following form data:

- `base64data` - The base64-encoded file data.
- `parent` - The parent folder or path where you want to store the file.

Example using `curl`:

```bash
curl -X POST \
     -F "base64data=<base64string>" \
     -F "parent=<parent_folder/child_folder>" \
     https://cloudflare-cloudstorage-uploader.<yourdomain>.workers.dev/
```

## Deployment

To deploy CloudStorage Uploader to your Cloudflare Workers instance, follow these steps:

   Configure your Cloudflare Workers environment variables with the following:

   - `S3_ENDPOINT_URL`: Your AWS S3 endpoint.
   - `S3_ACCESS_KEY`: Your AWS S3 access key.
   - `S3_SECRET`: Your AWS S3 secret key.
   - `S3_SPACE_NAME`: Your AWS S3 space name.
   - `S3_CLOUD_REGION`: Your AWS S3 cloud region.

1. Prepare your Cloudflare Workers environment variables :

     - Interact with environment variables [locally](https://developers.cloudflare.com/workers/reference/apis/environment-variables/)
  
          When developing locally via wrangler dev, add environment variables by creating a .dev.vars file in the root directory of your project. Then add the following code snippet to .dev.vars:

     ``` bash
     `.dev.vars`
     S3_ENDPOINT_URL=development
     ```

     - via [dashboard](https://developers.cloudflare.com/workers/configuration/environment-variables/#add-environment-variables-via-the-dashboard)




2. Deploy the code to Cloudflare Workers:

   Use the Cloudflare Workers CLI or your preferred deployment method to publish the code to your Cloudflare Workers instance.

3. Your CloudStorage Uploader is now live and ready to accept file uploads.

## Contributing

Feel free to contribute to this project by submitting issues or pull requests on the [GitHub repository](https://github.com/yourusername/cloudstorage-uploader).

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.

Enjoy using CloudStorage Uploader for your file uploading needs on Cloudflare Workers!




# develop
```bash
yarn install
yarn start
```

# deploy

```bash
yarn deploy
```