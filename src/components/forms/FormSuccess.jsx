import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function FormSuccess({ title = 'Request Received', message }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="w-20 h-20 rounded-full bg-hype-green/10 flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle2 className="w-10 h-10 text-hype-green" />
      </motion.div>
      <h3 className="font-heading text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-hype-slate text-base max-w-md mx-auto">
        {message || 'Your request has been received. The HypeGrid team will contact you shortly.'}
      </p>
    </motion.div>
  );
}