const rlto = async (url: string, filename: string, mimeType: { type: string }) => {
    return await fetch(url)
        .then(function (res) {
            return res.arrayBuffer();
        })
        .then(function (buf) {
            return new File([buf], filename, mimeType);
        });
};

export { rlto };
