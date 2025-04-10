"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ProposalSection from "@/components/ProposalSection";
import ContactForm from "@/components/ContactForm";

export default function Proposal() {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  // 쿼리 파라미터로 모달 오픈
  useEffect(() => {
    if (searchParams.get("apply") === "true") {
      setOpen(true);
    }
  }, [searchParams]);

  // 모달 닫을 때 URL에서 ?apply=true 제거
  const handleClose = () => {
    setOpen(false);
    router.replace("/proposal", { scroll: false });
  };

  return (
    <>
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
    </>
  );
}
