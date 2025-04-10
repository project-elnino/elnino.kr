"use client";

import { motion } from "framer-motion";

export default function ProposalSection() {
  const items = [
    "🌐 실시간 번역 자막 제공",
    "🗣️ 최대 101개 언어 지원",
    "✅ 복잡한 설정 없이 간단한 클라이언트 설치만으로 이용 가능",
  ];

  return (
    <section className="space-y-12 py-20">
      {items.map((text, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.3 }}
          className="text-center text-2xl font-semibold"
        >
          {text}
        </motion.div>
      ))}
    </section>
  );
}
