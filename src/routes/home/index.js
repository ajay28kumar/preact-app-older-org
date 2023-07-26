import Button from 'preact-material-components/Button';
import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import FormField from 'preact-material-components/FormField';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import Radio from 'preact-material-components/Radio';
import Select from 'preact-material-components/Select';
import style from './style.css';
import MuiInput from '../../components/material-ui/muiInput';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldHide: true,
      aadhaarNo: '',
      firstName: '',
      lastName: '',
      birthDate: '',
      gender: '',
    };

    this.toggleSteps = this.toggleSteps.bind(this);
  }

  toggleSteps = () => {
    this.setState({
      shouldHide: !this.state.shouldHide,
    });
  };

  setFormValues(inputName, inputVal) {
    if (inputName && inputName.length > 0) {
      if (inputName == 'aadhaarNo') {
        this.setState({
          aadhaarNo: inputVal,
        });
      } else if (inputName == 'firstName') {
        this.setState({
          firstName: inputVal,
        });
      } else if (inputName == 'lastName') {
        this.setState({
          lastName: inputVal,
        });
      } else if (inputName == 'birthDate') {
        this.setState({
          birthDate: inputVal,
        });
      } else if (inputName == 'gender') {
        this.setState({
          gender: inputVal,
        });
      }
    }
  }

  render() {
    return (
      <div class={`${style.home} page`}>
        <h2 class=' mdc-typography--title'>E-Kyc Verification</h2>
        <Card>
          <div class={style.cardHeader}>
            <div class=' mdc-typography--caption'>
              <div
                className={this.state.shouldHide ? 'show' : 'hidden'}
                style='font-weight: 600'>
                Step 1 / 2 : Enter personal information as per Aadhaar
              </div>
              <div
                className={this.state.shouldHide ? 'hidden' : 'show'}
                style='font-weight: 600'>
                Step 2 / 2 : Enter Address information as per Aadhaar
              </div>
            </div>
          </div>
          <div class={style.cardBody}>
            <div className={this.state.shouldHide ? 'show' : 'hidden'}>
              <LayoutGrid>
                <LayoutGrid.Inner>
                  <LayoutGrid.Cell cols='12'>
                    <div>
                      <MuiInput
                        inputType='tel'
                        inputLabel='Aadhaar #'
                        onChange={(e) => {
                          this.setFormValues('aadhaarNo', e.target.value);
                        }}
                      />
                    </div>
                  </LayoutGrid.Cell>
                </LayoutGrid.Inner>
              </LayoutGrid>
              <LayoutGrid>
                <LayoutGrid.Inner>
                  <LayoutGrid.Cell cols='2'>
                    <div>
                      <MuiInput
                        inputLabel='First Name'
                        onChange={(e) => {
                          this.setFormValues('firstName', e.target.value);
                        }}
                      />
                    </div>
                  </LayoutGrid.Cell>
                  <LayoutGrid.Cell cols='2'>
                    <div>
                      <MuiInput
                        inputLabel='Last Name'
                        onChange={(e) => {
                          this.setFormValues('lastName', e.target.value);
                        }}
                      />
                    </div>
                  </LayoutGrid.Cell>
                </LayoutGrid.Inner>
              </LayoutGrid>
              <LayoutGrid>
                <LayoutGrid.Inner>
                  <LayoutGrid.Cell cols='12'>
                    <div>
                      <MuiInput
                        inputType='date'
                        inputLabel='Birth Date'
                        onChange={(e) => {
                          this.setFormValues('birthDate', e.target.value);
                        }}
                      />
                    </div>
                  </LayoutGrid.Cell>
                </LayoutGrid.Inner>
              </LayoutGrid>

              <LayoutGrid>
                <LayoutGrid.Inner>
                  <LayoutGrid.Cell cols='12'>
                    <div>
                      <label>Select Gender</label>
                    </div>
                  </LayoutGrid.Cell>
                  <LayoutGrid.Cell cols='2'>
                    <div>
                      <FormField>
                        <Radio
                          id='r1'
                          name='opts'
                          onClick={(e) => {
                            {
                              this.setFormValues('gender', 'Male');
                            }
                          }}
                        />
                        <label
                          for='r1'
                          onClick={(e) => {
                            {
                              this.setFormValues('gender', 'Male');
                            }
                          }}>
                          Male
                        </label>
                      </FormField>
                    </div>
                  </LayoutGrid.Cell>
                  <LayoutGrid.Cell cols='2'>
                    <div>
                      <FormField>
                        <Radio
                          id='r2'
                          name='opts'
                          onClick={(e) => {
                            {
                              this.setFormValues('gender', 'Female');
                            }
                          }}
                        />
                        <label
                          for='r2'
                          onClick={(e) => {
                            {
                              this.setFormValues('gender', 'Female');
                            }
                          }}>
                          Female
                        </label>
                      </FormField>
                    </div>
                  </LayoutGrid.Cell>
                </LayoutGrid.Inner>
              </LayoutGrid>
              <LayoutGrid>
                <LayoutGrid.Inner>
                  <LayoutGrid.Cell cols='12'>
                    <div>
                      <Button
                        raised
                        ripple
                        style='width: 100%'
                        onClick={this.toggleSteps}>
                        Continue
                      </Button>
                    </div>
                  </LayoutGrid.Cell>
                </LayoutGrid.Inner>
              </LayoutGrid>
            </div>
            <div className={this.state.shouldHide ? 'hidden' : 'show'}>
              <LayoutGrid>
                <LayoutGrid.Inner>
                  <LayoutGrid.Cell cols='2'>
                    <div>Name :</div>
                  </LayoutGrid.Cell>
                  <LayoutGrid.Cell cols='2'>
                    <div>
                      <strong>
                        {this.state.firstName} {this.state.lastName}
                      </strong>
                    </div>
                  </LayoutGrid.Cell>
                  <LayoutGrid.Cell cols='2'>
                    <div>Birth Date :</div>
                  </LayoutGrid.Cell>
                  <LayoutGrid.Cell cols='2'>
                    <div>
                      <strong>{this.state.birthDate}</strong>
                    </div>
                  </LayoutGrid.Cell>
                  <LayoutGrid.Cell cols='2'>
                    <div>Gender :</div>
                  </LayoutGrid.Cell>
                  <LayoutGrid.Cell cols='2'>
                    <div>
                      <strong>{this.state.gender}</strong>
                    </div>
                  </LayoutGrid.Cell>
                  <LayoutGrid.Cell cols='12'>
                    <div style='text-align: center'>
                      <span
                        style='color: #227ae0;cursor: pointer'
                        onClick={this.toggleSteps}>
                        Edit Info
                      </span>
                    </div>
                  </LayoutGrid.Cell>
                </LayoutGrid.Inner>
              </LayoutGrid>
              <LayoutGrid>
                <LayoutGrid.Inner>
                  <LayoutGrid.Cell cols='12'>
                    <div>
                      <MuiInput inputLabel='Address as per Aadhaar' />
                    </div>
                  </LayoutGrid.Cell>
                </LayoutGrid.Inner>
              </LayoutGrid>
              <LayoutGrid>
                <LayoutGrid.Inner>
                  <LayoutGrid.Cell cols='12'>
                    <div>
                      <Select
                        hintText='Select a State'
                        selectedIndex={this.state.chosenIndex}
                        onChange={(e) => {
                          this.setState({
                            chosenIndex: e.selectedIndex,
                          });
                          //selected options
                          console.log(e.selectedOptions);
                        }}>
                        <Select.Item>opt1</Select.Item>
                        <Select.Item>opt2</Select.Item>
                        <Select.Item>opt3</Select.Item>
                        <Select.Item>opt4</Select.Item>
                      </Select>
                    </div>
                  </LayoutGrid.Cell>
                </LayoutGrid.Inner>
              </LayoutGrid>
              <LayoutGrid>
                <LayoutGrid.Inner>
                  <LayoutGrid.Cell cols='12'>
                    <div>
                      <Select
                        hintText='Select a City'
                        selectedIndex={this.state.chosenIndex}
                        onChange={(e) => {
                          this.setState({
                            chosenIndex: e.selectedIndex,
                          });
                          //selected options
                          console.log(e.selectedOptions);
                        }}>
                        <Select.Item>opt1</Select.Item>
                        <Select.Item>opt2</Select.Item>
                        <Select.Item>opt3</Select.Item>
                        <Select.Item>opt4</Select.Item>
                      </Select>
                    </div>
                  </LayoutGrid.Cell>
                </LayoutGrid.Inner>
              </LayoutGrid>
              <LayoutGrid>
                <LayoutGrid.Inner>
                  <LayoutGrid.Cell cols='12'>
                    <div>
                      <MuiInput inputLabel='Pin Code' />
                    </div>
                  </LayoutGrid.Cell>
                </LayoutGrid.Inner>
              </LayoutGrid>
              <LayoutGrid>
                <LayoutGrid.Inner>
                  <LayoutGrid.Cell cols='12'>
                    <div>
                      <Button raised ripple style='width: 100%'>
                        Continue to Ekyc
                      </Button>
                    </div>
                  </LayoutGrid.Cell>
                </LayoutGrid.Inner>
              </LayoutGrid>
            </div>
          </div>
          <Card.Actions />
        </Card>
      </div>
    );
  }
}
