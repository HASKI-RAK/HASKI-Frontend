/*test('popover is rendered when Topics button is clicked', async () => {
    const { getByText, getAllByTestId } = render(
      <MemoryRouter>
        <MenuBar />
      </MemoryRouter>
    )

    await waitFor(async () => {
      fireEvent.click(getByText('appGlobal.topics'))
      await waitFor(() => {
        expect(getAllByTestId('Menubar-Topic-Wirtschaftsinformatik')[0]).toBeInTheDocument()
      })
    })
  })*/

/*test('fetching user when opening Topics throws error ', async () => {
    mockServices.fetchUser.mockImplementationOnce(() => {
      throw new Error('Error')
    })

    jest.spyOn(console, 'error').mockImplementation(() => {
      return
    })

    const { container, getByText } = render(
      <MemoryRouter>
        <MenuBar />
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(getByText('appGlobal.topics'))
      waitFor(() => {
        expect(container.querySelector('.MuiSkeleton-root')).toBeInTheDocument()
      })
    })
  })*/

/*test('fetching topic throws error ', async () => {
    mockServices.fetchLearningPathTopic.mockImplementationOnce(() => {
      throw new Error('Error')
    })

    jest.spyOn(console, 'error').mockImplementation(() => {
      return
    })

    const { container, getByText } = render(
      <MemoryRouter>
        <MenuBar />
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(getByText('appGlobal.topics'))
      waitFor(() => {
        expect(container.querySelector('.MuiSkeleton-root')).toBeInTheDocument()
      })
    })
  })*/

/*it('should set anchorElTopics to null', async () => {
    const { getByText, getAllByTestId } = render(
      <MemoryRouter>
        <MenuBar />
      </MemoryRouter>
    )

    await waitFor(async () => {
      fireEvent.click(getByText('appGlobal.topics'))
      await waitFor(() => {
        expect(getAllByTestId('Menubar-Topic-Wirtschaftsinformatik')[0]).toBeInTheDocument()
        fireEvent.click(getAllByTestId('Menubar-Topic-Wirtschaftsinformatik')[0])
        expect(navigate).toHaveBeenCalledWith('course/undefined/topic/1')
      })
    })
  })*/
