/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			'images.ctfassets.net',
			'cdn.britannica.com',
			'www.lasanteca.com',
			'www.nutrifactor.com.pk',
			'cloudinary.images-iherb.com',
			'm.media-amazon.com',
			'newgpc.com',
			'i5.walmartimages.com',
			'd1flfk77wl2xk4.cloudfront.net',
			'cdn-prod.medicalnewstoday.com',
			'pharmafactz.com',
			'logo.clearbit.com',
			'res.cloudinary.com',
		].map((hostname) => ({
			protocol: 'https',
			hostname,
			port: '',
			pathname: `/**`,
		})),
	},
  // env: {
  //   API_URL: process.env.API_URL,
  // },
}

export default nextConfig
