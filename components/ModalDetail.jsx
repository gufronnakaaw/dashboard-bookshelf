import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from '@material-tailwind/react';

export default function ModalDetail({ open, setOpen, data }) {
  return (
    <>
      <Dialog open={open} handler={() => setOpen(!open)}>
        <DialogHeader>Detail Book</DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          <div>
            <Typography variant="small">Page Count</Typography>
            <Typography variant="small">{data.page_count}</Typography>
          </div>
          <div>
            <Typography variant="small">Summary</Typography>
            <Typography variant="small">{data.summary}</Typography>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setOpen(!open)}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
