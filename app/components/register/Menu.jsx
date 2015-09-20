import { Reapp, React, NestedViewList, View, Button, Input , Block, Container} from 'reapp-kit';

class Menu extends React.Page {

  componentDidMount(){
    this.businessId = this.router().getCurrentQuery().business_id;
    this.ref = new Firebase('https://jumpp.firebaseio.com/business/'+this.orderId);
    this.bindAsArray(this.ref.limittoLast(25), 'business');

    console.log(businessId);
  }

  handleChange() {

    let item = this.refs.item.getDOMNode().value;
    let price = this.refs.price.getDOMNode().value;

    console.log(item+ " added!");
    
    var firebaseRef = new Firebase('https://jumpp.firebaseio.com/business');
    var menuItem = firebaseRef.child("menus");

    menuItem.push().set({
      name: item,
      price: price
    });
  }

  render() {
    return (
      <NestedViewList {...this.props.viewListProps}>
        <View title="jumpp">
          <p> Make your menu </p>

          <Container>
            
            <Block>
            <Input ref="item" placeholder={"Item"} />
            </Block>

            <Block>
            <Input ref="price" placeholder={"Price"} />
            </Block>

          </Container>

          <Button onTap={this.handleChange}>
            Add
          </Button>

          <Button onTap={() => this.router().transitionTo('app')}>
            Done
          </Button>

        </View>

        {this.childRouteHandler()}
      </NestedViewList>
    );
  }
}

export default Menu;

/*
 This is your root route. When you wrap it with Reapp()
 it passes your class two properties:

  - viewListProps: Passes the scrollToStep to your ViewList so it animates
  - child: The child route
*/
