# Builder stage
FROM node:18 as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime stage
FROM node:18 as runtime
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3100
CMD ["npm", "start"]