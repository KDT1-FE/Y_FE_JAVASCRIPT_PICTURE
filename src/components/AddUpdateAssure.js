import { Component } from '../core';
import { updateData, deleteData } from '../dispatch';
import modalSubmitState from '../store/modalSubmitState';

export default class AddUpdateAssure extends Component {
    constructor(props) {
        super({
            props,
            tagName: 'button',
        });
    }
    render() {
        this.el.textContent = 'YES';
        const _id = history.state.id;
        this.el.addEventListener('click', () => {
            if (this.props === 'update') {
                updateData(_id);
            } else if (this.props === 'delete') {
                deleteData(_id);
                location.href = '/#/';
            }
            modalSubmitState.state.submit = false;
        });
    }
}
