import { Box, Container, Input } from "@chakra-ui/react";


export default function ProductPage(){
    return (
        <Container marginTop="50px">

            <Box>
                <Input type="text" placeholder="Search product here ....." />
            </Box>
        </Container>
    )
}