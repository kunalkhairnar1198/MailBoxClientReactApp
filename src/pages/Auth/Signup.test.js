import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import Signup from './Signup';
import { store } from '../../../Store/Store';
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoaderActions } from '../../../Store/UI-Slice/loader-slice';
import { act } from 'react';


describe('Signup Component test cases',()=>{
    test('Render Signup components', () => {
      render(
        <Provider store={store}>
            <Router>
                <Signup />
            </Router>
        </Provider>
      )

    const submitBtnElement = screen.getByRole('button')
    userEvent.click(submitBtnElement)
    // console.log(submitBtnElement)

    const outputElement = screen.getByText('SignUp')
    expect(outputElement).toBeInTheDocument();
    })
    
    test('Render the form and test asynchronous submission', async () => {

        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            email: 'test@test.com',
            password: '123456',
            confirmPassword: '123456',
          }),
        });
    
        render(
          <Provider store={store}>
            <Router>
              <Signup />
            </Router>
          </Provider>
        );
    
        userEvent.type(screen.getByLabelText(/Email address/i), 'test@test.com');
        userEvent.type(screen.getByLabelText(/^Password$/i), '123456'); 
        userEvent.type(screen.getByLabelText(/Confirm Password/i), '123456');
    
        const buttonElement = screen.getByRole('button')
        userEvent.click(buttonElement)

        const outputElement = screen.getByText('Signup')
        expect(outputElement).toBeInTheDocument()
    
        await waitFor(() => {
          expect(screen.getByRole('button')).toBeInTheDocument('Spinner');
        });
    
        await waitFor(() => {
          expect(window.fetch).toHaveBeenCalledTimes(1);
          expect(window.fetch).toHaveBeenCalledWith(
            expect.stringContaining('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC7hFWT415CG0qrbxEA-rWcjlUwQQptWL4'),
            expect.objectContaining({
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: 'test@test.com',
                password: '123456',
                returnSecureToken: true,
              }),
            })
          );
        });
    
        await waitFor(() => {
          expect(screen.getByRole('button')).not.toContainHTML('Spinner');
        });
      });


      test('test button visibility and conditional rendering of spinner', async () => {
        await act(async () => {
          render(
            <Provider store={store}>
              <Router>
                <Signup />
              </Router>
            </Provider>
          );
        });
    
        const buttonElement = screen.getByRole('button', { name: /Signup/i });
        expect(buttonElement).toBeInTheDocument();
    
        userEvent.type(screen.getByLabelText(/Email address/i), 'test@test.com');
        userEvent.type(screen.getByLabelText(/^Password$/i), '123456'); 
        userEvent.type(screen.getByLabelText(/Confirm Password/i), '123456');
    
        userEvent.click(buttonElement);
    
        await act(async () => {
          store.dispatch(LoaderActions.isLoadingData());
        });
    
        expect(screen.getByRole('button')).toBeInTheDocument('Spinner');
    
        await act(async () => {
          store.dispatch(LoaderActions.stopIsloading());
        });
    
        expect(screen.getByRole('button')).not.toContainHTML('Spinner');
        expect(screen.getByRole('button')).toHaveTextContent('Signup');
      });
})
