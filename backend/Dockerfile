# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM golang:1.9.2-alpine3.6 AS build

RUN apk add --no-cache git
RUN go get github.com/tkashish/ChatApp/backend

WORKDIR /go/src/github.com/tkashish/ChatApp/backend/

RUN go build -o /bin/backend

FROM scratch
COPY --from=build /bin/backend /bin/backend
EXPOSE 4000

ENTRYPOINT ["/bin/backend"]


