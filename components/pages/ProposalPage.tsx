"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProposalSection from "@/components/ProposalSection";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";

export default function ProposalPage({ openOnLoad }: { openOnLoad?: boolean }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (openOnLoad) {
      setOpen(true);
    }
  }, [openOnLoad]);

  const handleClose = () => {
    setOpen(false);
    router.replace("/proposal", { scroll: false });
  };

  return (
    <main className="container py-12">
      <ProposalSection />
      <div className="flex justify-center mt-10">
        <Dialog open={open} onOpenChange={(v) => (v ? setOpen(true) : handleClose())}>
          <DialogTrigger asChild>
            <Button size="lg">이용 문의 / 신청하기</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogTitle>이용 신청하기</DialogTitle>
            <ContactForm onSuccess={handleClose} />
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
