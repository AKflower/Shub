FROM ipfs/kubo:master

# Cài đặt các gói bổ sung (tùy chọn)

# Cấu hình IPFS (tùy chọn)

COPY ./entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

CMD ["/docker-entrypoint.sh"]
