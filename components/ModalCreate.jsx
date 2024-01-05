import fetcher from '@/utils/fetcher';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Textarea,
} from '@material-tailwind/react';
import { useState } from 'react';

export default function ModalCreate({ open, setOpen, mutate }) {
  const [value, setValue] = useState({});

  function handleValue(e) {
    setValue({
      ...value,
      [e.target.name]:
        e.target.name == 'year' || e.target.name == 'page_count'
          ? parseInt(e.target.value)
          : e.target.value,
    });
  }

  async function handleCreate() {
    try {
      await fetcher('/books', 'POST', value);
      setOpen(false);
      mutate();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Dialog open={open} handler={() => setOpen(!open)}>
        <DialogHeader>Create Book</DialogHeader>
        <DialogBody className="flex flex-col gap-3">
          <Input label="Name" name="name" onChange={handleValue} />
          <div className="flex gap-2">
            <Input label="Author" name="author" onChange={handleValue} />
            <Input
              label="Year"
              name="year"
              onChange={handleValue}
              type="number"
            />
          </div>
          <div className="flex gap-2">
            <Input label="Publisher" name="publisher" onChange={handleValue} />
            <Input
              label="Page Count"
              name="page_count"
              onChange={handleValue}
              type="number"
            />
          </div>
          <div>
            <Textarea label="Summary" name="summary" onChange={handleValue} />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setOpen(!open)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleCreate}>
            <span>Create</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
