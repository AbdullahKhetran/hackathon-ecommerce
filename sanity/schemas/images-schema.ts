const image = {
    name: "images",
    title: "Images",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "image",
            title: "Image",
            type: "image",
            options: { hotspot: true },
            fields: [
                {
                    name: "alt",
                    title: "Alt",
                    type: "string",
                }
            ]

        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
            }
        },
    ]
}

export default image