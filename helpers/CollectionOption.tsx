
export const collectionToOptions = (data: Record<string, any>[]) => {
    return data
        ? data.map((item) => ({
            value: item?.id?.toString(),
            label: item?.name,
            // label: item?.title ? item.title : item?.name,
        }))
        : [];
};
