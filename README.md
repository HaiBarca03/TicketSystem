- Hệ thống đặt vé thiết kế theo mô hình Saga (Saga Pattern) để quản lý transaction qua hệ thống microservices.
- Được triển khai qua các service:
  + Main Service: Quản lý user, product, ticket
  + Booking Service:
    - Quản lý booking ticket.
    - Xử lý các trường hợp giữ vé, chưa thanh toán trong 1 khoảng thời gian định sẵn
    - Auto cance ticket khi quá thời gian chờ với Node Schedule (Lên lịch công việc với thời gian cụ thể)
    - Xử lý nhiều khách hàng đặt vé 1 lúc với message queue của RabbitMQ, tránh quá tải hệ thống.
  + Payment Service:
    - Chức năng thanh toán qua cổng ZaloPay
    - Xử lý nhiều thanh toán 1 lúc với message queue của RabbitMQ
- Database được thiết kế riêng với từng service tương ứng. Ghi lại được các yếu tố cần thiết với hệ thống vé, các trạng thái, thời gian thực hiện
- API được trả về theo từng mục với url rõ ràng. Mỗi API thực hiện một chức năng khác nhau.
