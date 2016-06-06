
############################################################
# Dockerfile to run cricd bowler-match-processor API
############################################################

FROM node:4-slim
MAINTAINER Bradley Scott

# Copy code to container
RUN mkdir cricd-bowler-match-processor
COPY . /cricd-bowler-match-processor

# Get dependencies
RUN cd cricd-bowler-match-processor \
	&& npm install

# Define working directory.
WORKDIR /cricd-bowler-match-processor

# Start the service
CMD npm start

# Expose ports.
EXPOSE 3001
