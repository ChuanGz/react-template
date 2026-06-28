FROM node:24-alpine

WORKDIR /template
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY bin ./bin
COPY src ./src
COPY scripts ./scripts

USER node
ENTRYPOINT ["node", "bin/create-react-template.mjs"]
