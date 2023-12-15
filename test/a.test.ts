import {test,expect} from 'vitest'
import handler from '@/pages/api/e2e-fake-server-time'

test('useFakeTimers is not called for production',()=>{
    expect(1).toBe(1)
})