import { useState } from 'react';

/**
 * Shared submit handler for the public conversion forms. Keeps the page JSX
 * clean: it owns submitting / submitted / error state and never clears the
 * caller's form data on failure (so the user can retry without re-typing).
 *
 *   const { submitting, submitted, error, submit } = usePublicForm(publicApi.submitContact);
 *   <form onSubmit={(e) => { e.preventDefault(); submit(form); }}>
 */
export function usePublicForm(submitFn) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (form) => {
    setSubmitting(true);
    setError(null);
    try {
      await submitFn(form);
      setSubmitted(true);
    } catch (e) {
      setError(
        e?.message ||
          'Something went wrong sending your request. Please try again, or contact HypeGrid directly.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return { submitting, submitted, error, submit };
}
