import { Component, Prop, State, Method } from '@stencil/core';

@Component({
  tag: 'app-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true,
})
export class SideDrawer {
  @State() showContactInfo: boolean;

  @Prop({ reflectToAttr: true }) title: string = 'dupa';
  @Prop({ reflectToAttr: true, mutable: true }) opened: boolean;

  @Method()
  open() {
    this.opened = true;
  }

  onCloseDrawer() {
    this.opened = false;
  }

  onContentChange(content: string) {
    this.showContactInfo = content === 'contact';
  }

  render() {
    let mainContent = <slot />;
    if (this.showContactInfo) {
      mainContent = (
        <div id="contact-information">
          <h2>Contact Information</h2>
          <p>You can reach us via phone or email</p>
          <ul>
            <li>Phone: 78333737838</li>
            <li>
              E-Mail: <a href="/">something@gmail.com</a>
            </li>
          </ul>
        </div>
      );
    }

    return [
      <div class="backdrop" onClick={this.onCloseDrawer.bind(this)} />,
      <aside>
        <header>
          <h1>{this.title}</h1>
          <button onClick={this.onCloseDrawer.bind(this)}>x</button>
        </header>
        <section id="tabs">
          <button
            class={this.showContactInfo ? '' : 'active'}
            onClick={this.onContentChange.bind(this, 'nav')}
          >
            Navigation
          </button>
          <button
            class={this.showContactInfo ? 'active' : ''}
            onClick={this.onContentChange.bind(this, 'contact')}
          >
            Contact
          </button>
        </section>
        <main>{mainContent}</main>
      </aside>,
    ];
  }
}
