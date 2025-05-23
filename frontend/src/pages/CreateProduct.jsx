import { Box, Button, Container, Heading, Input, useColorModeValue, VStack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useProductStore } from '../store/product.js';
import { useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const CreateProduct = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: ""
    });
    const toast = useToast();
    const { addProduct } = useProductStore();
    const handleAddProduct = async() => {
        const { success, message } = await addProduct(newProduct)
        if(!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true
            })
        }
        setNewProduct({
            name: "",
            price: "",
            image: ""
        })
    }
  return (
    <Container maxW={"container.sm"}>
        <VStack spacing={8}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8} bgGradient='linear(to-r, cyan.400, blue.500)'
                    bgClip='text'
                    fontSize={{ base: "22", sm: "28"}}
                    fontWeight='extrabold'
                    textTransform={"uppercase"}>
                Create New Product
            </Heading>
            <Box
                w={"full"} bg={useColorModeValue("white", "gray.800")}
                p={6} rounded={"lg"} shadow={"md"}
            >
                <VStack spacing={4}>
                <Input
                        placeholder='Product Name'
                        name='name'
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                    <Input
                        placeholder='Price'
                        name='price'
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    />
                    <Input
                        placeholder='Image'
                        name='image'
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    />
                    <Button colorScheme='blue' onClick={handleAddProduct} w={"full"}>
                        Add Product
                    </Button>
                </VStack>
            </Box>
            <Link to={"/"}>
                <Button color={'blue.500'}>
                    See all products
                </Button>
        </Link>
        </VStack>
    </Container>
  )
}

export default CreateProduct