function refMock() {
  this.refCalls = []
  this.mocks = {}

  const fn = (reference) => {
    const ref = new refCall(reference, this.mocks[reference])
    this.refCalls.push(ref)
    return ref
  }

  const clear = () => (this.refCalls = [])

  const addMock = (reference, mock) => {
    this.mocks[reference] = mock
  }

  return {
    fn,
    calls: this.refCalls,
    clear,
    addMock,
  }
}

function refCall(reference, mock) {
  this.reference = reference
  this.stackCall = []
  this.mock = mock || {key: 123}

  const addChildCall = (...args) => {
    this.stackCall.push({
      child: args,
    })
    return _ref
  }
  const addPushCall = (...args) => {
    this.stackCall.push({
      push: args,
    })
    return this.mock
  }
  const addSetCall = (...args) => {
    this.stackCall.push({
      set: args,
    })
    return _ref
  }
  const _ref = {
    child: addChildCall,
    push: addPushCall,
    set: addSetCall,
    calls: this.stackCall,
    reference: this.reference,
  }

  return _ref
}

const ref = new refMock()
export const db = {
  ref: ref.fn,
  calls: ref.calls,
  clear: ref.clear,
  addMock: ref.addMock,
}

export default {
  db,
}
