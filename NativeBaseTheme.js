import {extendTheme} from "native-base";

export const theme = extendTheme({
    components: {
        // Heading: {
        //     baseStyle: (props: any) => {
        //         return {
        //             _light: {color: 'red.300'},
        //             _dark: {color: 'blue.300'},
        //         };
        //     },
        // },
        Button: {
            variants: {
                default: {
                    backgroundColor: '#010101',
                    _pressed: {
                        backgroundColor: 'gray.700',
                    },
                },
            },
        },
        Input: {
            variants: {
                default: {
                    borderWidth: 1,
                    borderColor: "#cccccc",
                    borderStyle: "solid",
                    _pressed: {
                        backgroundColor: "#fff",
                        borderColor: "#696969",
                    },
                    _focus: {
                        borderColor: "#696969",
                    }
                },
            },
        },
    },
});