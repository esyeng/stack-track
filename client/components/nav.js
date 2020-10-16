import ResponsiveNavbar from "@opuscapita/react-responsive-navbar";

const ResponsiveNavbarView = props => {
  const list = [
    { name: "Item 1", href: "/item1" },
    { name: "Item 2", href: "/item2" },
  ];

  const activeKey = 2;

  return (
    <ResponsiveNavbar
      activeKey={activeKey}
      list={list}
      onSelect={href => {
        props.router.push(href);
      }}
    />
  );
};

export default withRouter(ResponsiveNavbarView);
