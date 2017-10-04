module.exports={
    success: 'Thành công!',
    internal_error: 'Lỗi hệ thống, xin vui lòng thử lại!',
    // I: REGISTER
    invalid_email: 'Email không hợp lệ!',
    invalid_password: 'Độ dài password không đúng, yêu cầu 8 - 16 ký tự.',
    invalid_age: 'Yêu cầu từ 18 đến 40 tuổi để sử dụng ứng dụng này',
    invalid_phone: 'Số ĐT không đúng!',
    exist_email: 'Email đã được đăng ký!',
    // II: LOGIN
    wrong_email_password: 'Email hoặc mật khẩu không đúng!',
    // III: FORGOT
    not_exist_email: 'Email không tồn tại!',

    // IV: ORDER
    invalid_total_deposit: 'Tổng tiền hoặc tiền cọc phải là chữ số (0-9)!',
    invalid_status: 'Trạng thái (status) đơn hàng phải là chữ số (0 - open, 1 - choosing, 2 - delivering, 3 - expired, 4 - closed)!',
    invalid_action: 'Action phải là chữ số (0 - delivering, 1 - closed)!',
    not_allow_seller_choose: 'Bạn là người bán hàng. Không thể chọn đơn hàng!',
    not_allow_shipper_open: 'Bạn là shipper. Không thể tạo đơn hàng!',
    not_allow_shipper_deliver: 'Bạn là shipper. Không thể chọn giao hàng!',
    not_allow_shipper_close: 'Bạn là shipper. Không thể chọn hoàn thành!',
    not_exist_order_id: 'Không tìm thấy order với id: '
};
