const colorVietnamese = (color) => {
    switch (color) {
        case 'white':
            return 'Trắng';
        case 'black':
            return 'Đen';
        case 'gray':
            return 'Xám';
        case 'purple':
            return 'Tím';
        case 'blue':
            return 'Xanh';
        case 'cream':
            return 'Kem';
        case 'red':
            return 'Đỏ';
        case 'gold':
            return 'Vàng';
        case 'sliver':
            return 'Bạc';
        case 'pink':
            return 'Hồng';
        default:
            return color;
    }
};

export default colorVietnamese;
