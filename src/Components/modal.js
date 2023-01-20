import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SelectUser from './select';
import { useForm } from "react-hook-form";

export default function ModalPost({toggle, isOpen, save, changeUser}) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  function openModal(){
    toggle(prev=>!prev)
  }
  
  return (
    <div>
      <Button color="info" className='my-2 offset-11 text-white' onClick={openModal}>Add</Button>
      <Modal isOpen={isOpen} toggle={openModal}>
        <ModalHeader toggle={openModal}>Add Post</ModalHeader>
        <ModalBody>
          <form id='form' onSubmit={handleSubmit(save)}>
            <input {...register('title')} type="text" className='form-control my-3' placeholder='title' name='title' />
            <SelectUser name={'users'} changeUser={changeUser}/>
            <textarea {...register('body')} className='form-control my-3' placeholder='Body' name='body'></textarea>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" form="form" >Save</Button>
          <Button color="danger" onClick={openModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}