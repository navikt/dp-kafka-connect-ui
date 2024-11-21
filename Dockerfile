FROM gcr.io/distroless/nodejs22-debian12

WORKDIR /app

COPY ./public /app/public
COPY .next/standalone /app
COPY .next/static /app/.next/static


ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

CMD ["server.js"]