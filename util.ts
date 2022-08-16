const rlto = async (url: string, filename: string, mimeType: { type: string }) => {
    return await fetch(url)
        .then(function (res) {
            return res.arrayBuffer();
        })
        .then(function (buf) {
            return new File([buf], filename, mimeType);
        });
};

const uploadFile = async (files: File[]) => {
    try {
        console.log('files', files);
        //
    } catch (err) {
        throw Error(err);
    }
};

export { rlto, uploadFile };
