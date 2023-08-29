const product = {
    name: "products",
    title: "Products",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
        },
        {
            name: "gender",
            title: "Gender",
            type: "string",
            options: {
                list: ["male", "female", "kids"]
            }
        },
        {
            name: "category",
            title: "Category",
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
            name: "images",
            title: "Images",
            type: "array",
            of: [
                {
                    name: "secondary-image",
                    title: "Secondary Image",
                    type: "image",
                    options: {
                        hotspot: true,
                    }
                }
            ]
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name",
            }
        },
        {
            name: "price",
            title: "Price",
            type: "number",
        },
        {
            name: "details",
            title: "Details",
            type: "array",
            of: [{ type: "block" }]
        },
        {
            name: "care",
            title: "Product Care",
            type: "array",
            of: [{ type: "block" }]
        },

    ]
}

export default product