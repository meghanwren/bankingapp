index = 0;

function Account (data) {
  this.account = data.new;
  this.number = ++index;
}