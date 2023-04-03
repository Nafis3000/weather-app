/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
require("dotenv").config()

module.exports = {
  env: {
    WEATHER_KEY: process.env.WEATHER_KEY,
  }
}
