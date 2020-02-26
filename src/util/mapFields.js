export default (array, { action, base }) => {
  const form = {};

  array.forEach(item => {
    form[item] = {
      get() {
        return this.$store.state[base][item];
      },
      set(value) {
        this.$store.commit(action, { [item]: value });
      },
    };
  });

  return form;
};
