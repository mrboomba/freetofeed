import React, { Component } from "react";
import MaterialTable from 'material-table';
import Card from 'react-bootstrap/Card'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormGroup, FormControl, FormLabel, Table } from "react-bootstrap";
import axios from 'axios';
import { getJwt } from '../helpers'
import './home.css'


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { title: 'Breed', field: 'breed' },
                { title: 'Count', field: 'count' },
                { title: 'Date', field: 'date', type: 'date' }
            ],
            data: [
            ],
            dialog: false,
            dialog_list: false
        };
    }
    componentWillMount() {
        axios.get('http://localhost:8888/available', { headers: { Authorization: getJwt() } })
            .then(res => {
                this.setState({ 'data': res.data })
            })

    }

    handleSubmit() {


    }
    createTable = () => {

        axios.get('http://localhost:8888/users/duty', { headers: { Authorization: getJwt() } })
            .then(res => {
                let table = []
                console.log(res.data);
                
                // Outer loop to create parent
                for (let i = 0; i < 3; i++) {
                    let children = []
                    //Inner loop to create children
                    for (let j = 0; j < 5; j++) {
                        children.push(<td>{`Column ${j + 1}`}</td>)
                    }
                    //Create the parent and add the children
                    table.push(<tr>{children}</tr>)
                }
                console.log(table);

                return table
            })
    }


    render() {
        return (
            <div className="Home-component">
                {this.state.dialog_list && (<Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.state.dialog_list}
                    maxWidth="xs"
                    aria-labelledby="confirmation-dialog-title"
                >
                    <DialogTitle id="confirmation-dialog-title">รายการแมวที่ต้องเลี้ยง</DialogTitle>
                    <DialogContent dividers>
                        <Table striped bordered hover>
                            {this.createTable()}
                        </Table>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { this.setState({ 'dialog_list': false }) }} color="primary">
                            Ok
        </Button>
                    </DialogActions>
                </Dialog>)}

                {this.state.dialog && (<div>
                    <Dialog open={this.state.dialog} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                        <DialogContent>
                            <FormGroup controlId="date" size="large">
                                <FormLabel>วันที่</FormLabel>
                                <FormControl
                                    autoFocus
                                    type="date"
                                    onChange={(event) => {
                                        this.setState({
                                            [event.target.id]: event.target.value
                                        }, () => {
                                            console.log(this.state);

                                        });
                                    }}
                                />
                            </FormGroup>
                            <FormGroup controlId="breed" size="large">
                                <FormLabel>พันธุ์</FormLabel>
                                <FormControl
                                    onChange={(event) => {
                                        this.setState({
                                            [event.target.id]: event.target.value
                                        }, () => {
                                            console.log(this.state);

                                        });
                                    }}
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup controlId="count" size="large">
                                <FormLabel>จำนวน</FormLabel>
                                <FormControl
                                    onChange={(event) => {
                                        this.setState({
                                            [event.target.id]: event.target.value
                                        }, () => {
                                            console.log(this.state);

                                        });
                                    }}
                                    type="number"
                                />
                            </FormGroup>
                            <FormGroup controlId="cost" size="large">
                                <FormLabel>ราคา</FormLabel>
                                <FormControl
                                    onChange={(event) => {
                                        this.setState({
                                            [event.target.id]: event.target.value
                                        }, () => {
                                            console.log(this.state);

                                        });
                                    }}
                                    type="number"
                                />
                            </FormGroup>
                            <FormGroup controlId="contract" size="large">
                                <FormLabel>ติดต่อ</FormLabel>
                                <FormControl
                                    onChange={(event) => {
                                        this.setState({
                                            [event.target.id]: event.target.value
                                        }, () => {
                                            console.log(this.state);

                                        });
                                    }}
                                    type="text"
                                />
                            </FormGroup>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => { this.setState({ 'dialog': false }) }} color="primary">
                                Cancel
          </Button>
                            <Button onClick={() => {
                                const { date,
                                    count,
                                    cost,
                                    breed,
                                    contract } = this.state
                                axios.post('http://localhost:8888/users/available', {
                                    date,
                                    count,
                                    cost,
                                    breed,
                                    contract,

                                }, { headers: { Authorization: getJwt() } })
                                    .then(res => {
                                        axios.get('http://localhost:8888/available', { headers: { Authorization: getJwt() } })
                                            .then(res => {
                                                this.setState({ 'data': res.data })
                                                this.setState({ 'dialog': false })
                                            })

                                    })
                            }} color="primary">
                                OK
          </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                )}
                <Card style={{ width: '75%', float: 'none', margin: '0 auto', backgroundColor: 'rgba(200, 200, 200, 0.5)' }}>
                    <Card.Body>
                        <MaterialTable
                            title="ฝากเลี้ยงหน่อยนะ"
                            columns={this.state.columns}
                            data={this.state.data}
                            style={{ backgroundColor: 'rgba(200, 200, 200, 0.8)' }}
                            actions={[
                                {
                                    icon: 'pan_tool',
                                    tooltip: 'ช่วยเลี้ยงหน่อย',
                                    onClick: (event, rowData) => axios.post('http://localhost:8888/users/duty', {
                                        rowData
                                    }, { headers: { Authorization: getJwt() } })
                                        .then(res => {
                                            axios.get('http://localhost:8888/available', { headers: { Authorization: getJwt() } })
                                                .then(res => {
                                                    this.setState({ 'data': res.data })
                                                    this.setState({ 'dialog': false })
                                                })

                                        })

                                },
                                {
                                    icon: 'tag_faces',
                                    tooltip: 'เดี๋ยวช่วยเลี้ยงเอง',
                                    isFreeAction: true,
                                    onClick: (event, rowData) => {
                                        this.setState({ 'dialog': !this.state.dialog })
                                    }
                                },
                                {
                                    icon: 'notifications',
                                    tooltip: 'ต้องช่วยเลี้ยงตัวไหนบ้างนะ',
                                    isFreeAction: true,
                                    onClick: (event, rowData) => {
                                        this.setState({ 'dialog_list': !this.state.dialog_list })
                                    }
                                }
                            ]}
                        />
                    </Card.Body>
                </Card>
            </div>

        );
    }
}
