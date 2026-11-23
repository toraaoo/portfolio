function JsonLd({ data }: { readonly data: object }) {
  return (
    <script type="application/ld+json">
      {JSON.stringify(data).replace(/</g, "\\u003c")}
    </script>
  )
}

export { JsonLd }
