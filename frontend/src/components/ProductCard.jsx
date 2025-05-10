import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useProductStore } from '../store/product';

const ProductCard = ({product}) => {
    const [updatedProduct, setUpdatedProduct] = useState(product)
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const toast = useToast();
    const {deleteProduct, editProduct} = useProductStore();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleDelete = async(pid) => {
        const { success, message } = await deleteProduct(pid);
        if(!success) {
            toast({
                title: message,
                status: "error",
                duration: 3000,
                isClosable: true
            })
        } else {
            toast({
                title: message,
                status: "success",
                duration: 3000,
                isClosable: true
            })
        }
    }

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success, message } = await editProduct(pid, updatedProduct);
        if(!success) {
            toast({
                title: message,
                status: "error",
                duration: 3000,
                isClosable: true
            })
        } else {
            toast({
                title: message,
                status: "success",
                duration: 3000,
                isClosable: true
            })
        }
        onClose();
    }
  return (
    <Box
        shadow={'lg'}
        rounded={'lg'}
        overflow={'hidden'}
        transition={'all 0.3s'}
        bg={bg}
        _hover={{ transform: "translateY(-5px)", shadow: "xl"}}
    >
        <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'} />

        <Box p={4}>
            <Heading as={"h3"} size={"md"} mb={2}>
                {product.name}
            </Heading>

            <Text fontWeight={'bold'} fontSize={"xl"} mb={4} color={textColor} >
                ${product.price}
            </Text>

            <HStack spacing={2} >
                <IconButton onClick={onOpen} icon={<EditIcon />} colorScheme='blue' ></IconButton>
                <IconButton onClick={() => handleDelete(product._id)} icon={<DeleteIcon />} colorScheme='red' ></IconButton>
            </HStack>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        <Input
                            placeholder='Product Name'
                            name='name'
                            value={updatedProduct.name}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value})}
                        />
                        <Input
                            placeholder='Price'
                            name='price'
                            type='number'
                            value={updatedProduct.price}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value})}
                        />
                        <Input
                            placeholder='Image'
                            name='image'
                            value={updatedProduct.image}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value})}
                        />
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
                        Update
                    </Button>
                    <Button variant='ghost' onClick={onClose} >
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

    </Box>
  )
}

export default ProductCard