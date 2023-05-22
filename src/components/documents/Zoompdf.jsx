import React, { Fragment } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { path } from "../../utils/variables";

const Zoompdf = ({ handleOpen, open, pdf, close }) => {
  return (
    <Fragment>
      
      <Dialog open={open} size="xl" handler={handleOpen}>
        <DialogBody divider>
          <div class="w-full  flex items-start justify-center">
            <div class="w-full" style={{ height: '80vh'}}>
              <embed
                src={`${path}uploads/files/${pdf}`}
                typeof="application/pdf"
                type="application/pdf"
                class="w-full h-full rounded-md"
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => {
                close(null);
                handleOpen();
            }}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default Zoompdf;
