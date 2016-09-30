const filters = {
    regExpStr: (item, value) => new RegExp(item.regExpStr).test(value),
    maxNum: (item, value) => item.maxNum >= value
};

export default function validator(param) {
    return (rule, value, callback) => {
        if (value) {
            let i = 0;
            const ii = param.length;

            for (; i < ii; ++i) {
                const item = param[i];
                const { message } = item;
                const name = Object.keys(item)[0]; // 需要校验的规则必须放在对象第一位

                if (!filters[name](item, value)) {
                    callback(new Error(message));
                    break;
                }
            }

            if (i == ii) {
                callback();
            }
        } else {
            callback();
        }
    };
}
